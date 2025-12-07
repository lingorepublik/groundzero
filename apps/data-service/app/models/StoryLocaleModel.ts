import { Schema, model } from "mongoose";
import { LANGUAGES, SavedStoryLocale } from "shared";

const storyLocaleSchema = new Schema<SavedStoryLocale>({
  storyId: {
    type: Schema.Types.ObjectId,
    ref: "Story",
    required: true,
    index: true,
  },
  lang: { type: String, reqired: true, enum: LANGUAGES },
  titleTranslation: { type: String, required: true },
});

export const StoryLocaleModel = model("StoryLocale", storyLocaleSchema);
