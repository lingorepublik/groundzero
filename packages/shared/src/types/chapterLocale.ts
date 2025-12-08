import { ObjectId } from "mongoose";
import { Language } from "./language";

export type ChapterLocale = {
  chapterId: ObjectId | string;
  lang: Language;
  titleTranslation: string;
};

export type SavedChapterLocale = ChapterLocale & { _id: string };
