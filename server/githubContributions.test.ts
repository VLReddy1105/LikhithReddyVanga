import { describe, expect, it, vi } from "vitest";
import { CONTRIBUTION_QUERY, createContributionsService, sanitizeCalendar } from "./githubContributions";
import { isContributionCalendar } from "../shared/contributions";
import snapshot from "../client/src/data/github-contributions-2026.json";

// Synthetic protocol fixtures exist only in tests; they are never portfolio data.
function fixture() {
  const days = Array.from({length:365}, (_, i) => ({date:new Date(Date.UTC(2026,0,i+1)).toISOString().slice(0,10),contributionCount:i===0?5:0,contributionLevel:i===0?"FOURTH_QUARTILE":"NONE", privateRepositoryName:"confidential-test-fixture"}));
  return {data:{viewer:{login:"VLReddy1105"},user:{contributionsCollection:{restrictedContributionsCount:3,privateCommitMessage:"confidential-test-message",contributionCalendar:{totalContributions:5,weeks:[{contributionDays:days}]}}}}};
}
const response = () => new Response(JSON.stringify(fixture()), {status:200});
const start = Date.parse("2026-10-14T12:00:00Z");
describe("aggregate-only contribution integration", () => {
  it("preserves counts without adding restricted counts twice and strips confidential fields", () => {
    const data = sanitizeCalendar(fixture(),new Date(start).toISOString());
    expect(data.total).toBe(5); expect(data.restrictedCount).toBe(3); expect(data.days[0].count).toBe(5);
    expect(JSON.stringify(data)).not.toContain("confidential"); expect(JSON.stringify(data)).not.toContain("viewer");
    expect(CONTRIBUTION_QUERY).not.toMatch(/repository|commitContributions|message/);
  });
  it("rejects a token for another owner, corrupt totals and duplicate days", () => {
    const other = fixture(); other.data.viewer.login="another-owner"; expect(()=>sanitizeCalendar(other)).toThrow();
    const wrong = fixture(); wrong.data.user.contributionsCollection.contributionCalendar.totalContributions=6; expect(()=>sanitizeCalendar(wrong)).toThrow();
    const duplicate=fixture(); const days=duplicate.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays; days[1].date=days[0].date; expect(()=>sanitizeCalendar(duplicate)).toThrow();
  });
  it("returns a verified fallback without credentials or upstream requests", async () => {
    const request=vi.fn(); const service=createContributionsService({getToken:()=>undefined,request});
    const result=await service(); expect(request).not.toHaveBeenCalled(); expect(result.status).toBe("snapshot"); expect(isContributionCalendar(result.calendar)).toBe(true); expect(result.calendar.total).toBe(snapshot.total);
  });
  it("keeps credentials server-side and caches successful responses for an hour", async () => {
    let time=start; const request=vi.fn(async()=>response()); const service=createContributionsService({getToken:()=>"test-only-token",request,now:()=>time});
    expect((await service()).status).toBe("fresh"); expect((await service()).status).toBe("cached"); expect(request).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(await service())).not.toContain("test-only-token");
    time+=3600001; await service(); expect(request).toHaveBeenCalledTimes(2);
  });
  it("deduplicates concurrent requests", async () => {
    let release!: (response:Response)=>void; const request=vi.fn(()=>new Promise<Response>(resolve=>{release=resolve;}));
    const service=createContributionsService({getToken:()=>"test-only-token",request,now:()=>start});
    const first=service(),second=service(); release(response()); await Promise.all([first,second]); expect(request).toHaveBeenCalledTimes(1);
  });
  it("keeps last good aggregate data after rate limiting and applies a retry cooldown", async () => {
    let time=start; const request=vi.fn(async()=>response()); const service=createContributionsService({getToken:()=>"test-only-token",request,now:()=>time});
    await service(); time+=3600001; request.mockImplementation(async()=>new Response("private-test-upstream-error",{status:403}));
    const failed=await service(); expect(failed.status).toBe("stale"); expect(failed.calendar.total).toBe(5); expect(JSON.stringify(failed)).not.toContain("private-test-upstream-error");
    await service(); expect(request).toHaveBeenCalledTimes(2); time+=60001; await service(); expect(request).toHaveBeenCalledTimes(3);
  });
});
