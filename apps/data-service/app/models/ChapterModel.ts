import { Schema, model } from "mongoose";
import { Chapter, TIERS } from "shared";

const chapterSchema = new Schema<Chapter>({
  storyId: {
    type: Schema.Types.ObjectId,
    ref: "Story",
    required: true,
    index: true,
  },
  title: { type: String, required: true },
  seq: { type: Number, required: true },
  tier: { type: String, required: true, enum: TIERS, default: "free" },
  isDeleted: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
});

export const ChapterModel = model("Chapter", chapterSchema);
