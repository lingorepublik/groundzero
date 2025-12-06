import { ObjectId } from "mongoose";
import { Language } from "./language";

export type StoryLocale = {
  storyId: ObjectId;
  lang: Language;
  titleTranslation: string;
};

export type SavedStoryLocale = StoryLocale & { _id: ObjectId };
