import { ObjectId } from "mongoose";
import type { Language } from "./language";
import type { Level } from "./level";
import type { Tier } from "./tier";

export type Story<L extends Language = Language> = {
  lang: L;
  title: string;
  seq: number;
  level: Level<L>;
  tier: Tier;
  note?: string;
  isDeleted?: boolean;
  isPublished?: boolean;
};

export type SavedStory = Story & { _id: ObjectId };
