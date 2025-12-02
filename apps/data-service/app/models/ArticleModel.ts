import { Schema, model } from "mongoose";
import type { Tier, Language, Level } from "shared";

type ArticleSchemaType = {
  lang: Language;
  title: string;
  tier: Tier;
  seq: number;
  level: Level;
  note?: string;
};

const articleSchema = new Schema<ArticleSchemaType>(
  {
    lang: { type: String, required: true },
    title: { type: String, required: true },
    note: { type: String },
    tier: { type: String, required: true },
    seq: { type: Number, required: true },
    level: { type: String, required: true },
  },
  { timestamps: true }
);

export const Article = model("Article", articleSchema);
