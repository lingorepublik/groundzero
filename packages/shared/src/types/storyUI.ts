import { Tier } from "./tier.ts";
import { Level } from "./level.ts";
import { Language } from "./language.ts";

export type StoryUI = {
  storyId: string;
  progressList: Array<number>;
  trophyProgress: number;
  starredTrophyProgress: number;
  title: string;
  level: Level<Language>;
  tier: Tier;
  titleTranslation?: string;
  note?: string;
};
