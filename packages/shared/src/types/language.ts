// export const LANGUAGES = ["de-DE", "en-US", "fr-FR"] as const;
export const LANGUAGES = ["de-DE", "en-US"] as const;
export type Language = (typeof LANGUAGES)[number];
