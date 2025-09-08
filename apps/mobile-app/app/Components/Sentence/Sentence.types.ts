import type { SentenceBaloonDirection, SentenceBaloonType } from "../SentenceCharacter";

export type Sentence = {
  native: string;
  translated?: string;
  character?: string;
  sentenceBaloonType?: SentenceBaloonType;
  sentenceBaloonDirection?: SentenceBaloonDirection;
};