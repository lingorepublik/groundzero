export const LANGUAGES = ["de-DE", "en-US"] as const;
export type Language = (typeof LANGUAGES)[number];
