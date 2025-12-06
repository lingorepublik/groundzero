export const LANGUAGES = ["de-DE", "en-US", "fr-FR"] as const;
export type Language = (typeof LANGUAGES)[number];
