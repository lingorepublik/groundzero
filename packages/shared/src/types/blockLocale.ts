import { ObjectId } from "mongoose";
import { Language } from "./language.ts";

export type BlockLocale = {
  blockId: ObjectId | string;
  lang: Language;
  sentenceTranslation: string;
  insight?: string;
};

export type SavedBlockLocale = BlockLocale & { _id: string };
