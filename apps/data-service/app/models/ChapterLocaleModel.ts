import { Schema, model } from "mongoose";
import { LANGUAGES } from "shared";

const chapterLocaleSchema = new Schema({
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
    index: true,
  },
  lang: { type: String, required: true, enum: LANGUAGES },
  titleTranslation: { type: String, required: true },
});

export const ChapterLocaleModel = model("ChapterLocale", chapterLocaleSchema);
