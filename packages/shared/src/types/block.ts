import { ObjectId } from "mongoose";
import { Sentence } from "./sentence";

export type Illustration = string;

export const CONTENT_TYPES = ["ILLUSTRATION", "SENTENCE"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const AVATAR_EXPRESSIONS = [
  "TALK",
  "SMILE",
  "LAUGH",
  "SAD",
  "CRY",
  "THINK",
] as const;
export type AvatarExpression = (typeof AVATAR_EXPRESSIONS)[number];

export const BALLOON_DIRECTIONS = ["LEFT", "RIGHT"] as const;
export type BalloonDirection = (typeof BALLOON_DIRECTIONS)[number];

export const BALLOON_TYPES = ["TALK", "THINK"] as const;
export type BalloonType = (typeof BALLOON_TYPES)[number];

export type Block = {
  chapterId: ObjectId | string;
  seq: number;
  contentType: ContentType;
  content: Illustration | Sentence;
  character?: string;
  avatarUrl?: string;
  avatarExpression?: AvatarExpression;
  balloonDirection?: BalloonDirection;
  balloonType?: BalloonType;
  audio?: string;
  isDeleted?: boolean;
  isPublished?: boolean;
};

export type SavedBlock = Block & { _id: string };
