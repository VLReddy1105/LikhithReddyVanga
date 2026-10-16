/** Shared source of truth for homepage composition, navigation and scene stages. */
export const HOME_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "updates", label: "Updates" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
] as const;
export const SECTION_IDS = [
  "home",
  ...HOME_SECTIONS.map(section => section.id),
];
const SECTION_ALIASES: Record<string, string> = {
  projects: "work",
  social: "updates",
  skills: "experience",
};
export const canonicalSection = (id: string) => SECTION_ALIASES[id] ?? id;
