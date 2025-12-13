import { Schema, model } from "mongoose";
import { BlockLocale, LANGUAGES } from "shared";

const blockLocaleSchema = new Schema({
  blockId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Block",
    index: true,
  },
  lang: {
    type: String,
    required: true,
    enum: LANGUAGES,
  },
  sentenceTranslation: { type: String, required: true },
  insight: { type: String },
});

export const BlockLocaleModel = model<BlockLocale>(
  "BlockLocale",
  blockLocaleSchema,
);
