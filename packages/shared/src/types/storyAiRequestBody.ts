import type { Language } from "./language.ts";
import type { Level } from "./level.ts";
import { Tier } from "./tier.ts";

export type StoryAiRequestBody<L extends Language = Language> = {
  lang: L;
  tier: Tier;
  seq: number;
  setting: string;
  focus: string;
  level: Level<L>;
  characters?: string | undefined;
  note?: string | undefined;
};
