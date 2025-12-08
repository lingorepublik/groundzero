import { ObjectId } from "mongoose";
import { Tier } from "./tier";

export type Chapter = {
  storyId: ObjectId | string;
  title: string;
  seq: number;
  tier: Tier;
  isDeleted: boolean;
  isPublished: boolean;
};

export type SavedChapter = Chapter & { _id: string };
