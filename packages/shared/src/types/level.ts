import type { Language } from "./language";

export const LEVELS = {
  "de-DE": ["A1", "A2", "B1", "B2", "C1"] as const,
  "en-US": ["Beginner", "Intermediate", "Advanced"] as const,
} as const;

export type LevelsByLanguage = typeof LEVELS;

export type Level<L extends Language> = LevelsByLanguage[L][number];
