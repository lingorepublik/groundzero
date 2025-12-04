import { Schema, model } from "mongoose";
import { LANGUAGES, Story as StoryType, TIERS } from "shared";

const storySchema = new Schema<StoryType>(
  {
    lang: { type: String, required: true, enum: LANGUAGES },
    title: { type: String, required: true },
    seq: {
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => v > 0,
        message: `Seq must be a positive value`,
      },
    },
    level: { type: String, required: true },
    tier: { type: String, required: true, enum: TIERS },
    note: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Story = model("Story", storySchema);
