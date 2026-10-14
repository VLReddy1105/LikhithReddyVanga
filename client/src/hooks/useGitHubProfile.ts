import { useEffect, useRef, useState } from "react";
import snapshot from "@/data/github-snapshot.json";
import { selectedRepositoryNames } from "@/data/social";

interface Repository {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}
interface Profile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
}
interface Activity {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}
interface GitHubData {
  fetchedAt: string;
  profile: Profile;
  repositories: Repository[];
  activity?: Activity[];
}
const KEY = "vlr:github-public:v3";
const TTL = 60 * 60 * 1000;
let memory: { data: GitHubData; checkedAt: number } | undefined;
let pending: Promise<GitHubData> | undefined;
const validProfile = (p: Profile) =>
  p?.login === "VLReddy1105" &&
  p.html_url === "https://github.com/VLReddy1105" &&
  (p.name === null || typeof p.name === "string") &&
  (p.bio === null || typeof p.bio === "string") &&
  typeof p.avatar_url === "string" &&
  p.avatar_url.startsWith("https://avatars.githubusercontent.com/");
const validRepository = (r: Repository) =>
  r &&
  selectedRepositoryNames.includes(r.name) &&
  r.full_name === `VLReddy1105/${r.name}` &&
  r.html_url === `https://github.com/${r.full_name}` &&
  (r.description === null || typeof r.description === "string") &&
  (r.language === null || typeof r.language === "string") &&
  Number.isInteger(r.stargazers_count) &&
  r.stargazers_count >= 0;
const validData = (d: GitHubData) =>
  d &&
  Number.isFinite(Date.parse(d.fetchedAt)) &&
  validProfile(d.profile) &&
  Array.isArray(d.repositories) &&
  d.repositories.every(validRepository) &&
  (!d.activity ||
    (Array.isArray(d.activity) &&
      d.activity.every(
        e =>
          typeof e.id === "string" &&
          typeof e.type === "string" &&
          d.repositories.some(r => r.full_name === e.repo?.name) &&
          Number.isFinite(Date.parse(e.created_at))
      )));
function getSaved() {
  if (memory) return memory;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (
      saved &&
      Number.isFinite(saved.checkedAt) &&
      saved.checkedAt <= Date.now() &&
      validData(saved.data)
    )
      memory = saved;
  } catch {
    /* Verified bundled snapshot works without browser storage. */
  }
  return memory;
}
async function refresh(): Promise<GitHubData> {
  if (pending) return pending;
  pending = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    const read = async (path: string) => {
      const response = await fetch(`https://api.github.com/${path}`, {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      });
      if (!response.ok) throw new Error(`GitHub ${response.status}`);
      return response.json();
    };
    try {
      const [profile, rawRepos, rawEvents] = await Promise.all([
        read("users/VLReddy1105"),
        read("users/VLReddy1105/repos?per_page=100&sort=updated"),
        read("users/VLReddy1105/events/public?per_page=30").catch(() => null),
      ]);
      if (!validProfile(profile) || !Array.isArray(rawRepos))
        throw new Error("Unavailable public profile");
      const repositories: Repository[] = selectedRepositoryNames.flatMap(name =>
        rawRepos
          .filter(r => r.name === name && !r.private && validRepository(r))
          .map(r => ({
            name: r.name,
            full_name: r.full_name,
            description: r.description,
            html_url: r.html_url,
            language: r.language,
            stargazers_count: r.stargazers_count,
          }))
      );
      const activity = Array.isArray(rawEvents)
        ? rawEvents
            .filter(
              e =>
                e &&
                typeof e.id === "string" &&
                typeof e.type === "string" &&
                repositories.some(r => r.full_name === e.repo?.name) &&
                Number.isFinite(Date.parse(e.created_at))
            )
            .slice(0, 2)
            .map(e => ({
              id: e.id,
              type: e.type,
              repo: { name: e.repo.name },
              created_at: e.created_at,
            }))
        : undefined;
      const data = {
        fetchedAt: new Date().toISOString(),
        profile,
        repositories,
        activity,
      };
      memory = { data, checkedAt: Date.now() };
      try {
        localStorage.setItem(KEY, JSON.stringify(memory));
      } catch {
        /* In-memory caching remains available. */
      }
      return data;
    } catch (error) {
      // Cache a failed check too, preventing repeated rate-limited requests on revisits.
      memory = { data: getSaved()?.data ?? snapshot, checkedAt: Date.now() };
      try {
        localStorage.setItem(KEY, JSON.stringify(memory));
      } catch {
        /* Storage is optional. */
      }
      throw error;
    } finally {
      clearTimeout(timeout);
      controller.abort();
      pending = undefined;
    }
  })();
  return pending;
}
export function useGitHubProfile() {
  const ref = useRef<HTMLElement>(null);
  const [data, setData] = useState<GitHubData>(
    () => getSaved()?.data ?? snapshot
  );
  const [state, setState] = useState<
    "snapshot" | "cached" | "checking" | "updated" | "offline"
  >("snapshot");
  useEffect(() => {
    let active = true;
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(e => e.isIntersecting)) return;
        observer.disconnect();
        const saved = getSaved();
        if (saved && Date.now() - saved.checkedAt < TTL) {
          setData(saved.data);
          setState("cached");
          return;
        }
        setState("checking");
        refresh()
          .then(result => {
            if (active) {
              setData(result);
              setState("updated");
            }
          })
          .catch(() => {
            if (active) setState("offline");
          });
      },
      { rootMargin: "250px" }
    );
    observer.observe(element);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);
  return { ref, data, state };
}
