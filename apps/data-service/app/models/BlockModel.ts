import { Schema, model } from "mongoose";
import {
  AVATAR_EXPRESSIONS,
  BALLOON_DIRECTIONS,
  BALLOON_TYPES,
  Block,
  CONTENT_TYPES,
} from "shared/src/types";

const blockSchema = new Schema<Block>({
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
    index: true,
  },
  seq: { type: Number, required: true },
  contentType: { type: String, required: true, enum: CONTENT_TYPES },
  content: { type: Schema.Types.Mixed, required: true },
  character: { type: String },
  avatarUrl: { type: String },
  avatarExpression: { type: String, enum: AVATAR_EXPRESSIONS },
  balloonDirection: { type: String, enum: BALLOON_DIRECTIONS },
  balloonType: { type: String, enum: BALLOON_TYPES },
  audio: { type: String },
  isDeleted: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
});

export const BlockModel = model("Block", blockSchema);
