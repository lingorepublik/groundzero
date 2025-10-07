import type {
  SentenceBaloonDirection,
  SentenceBaloonType,
} from "../SentenceCharacter";

export type WordUnit = {
  word: string;
  translation?: string;
  insight?: string;
  punctuationMark?: boolean;
  refIndex?: number;
};

export type SentenceUnit = {
  sentence: Array<WordUnit>;
  translation?: string;
  character?: string;
  sentenceBaloonType?: SentenceBaloonType;
  sentenceBaloonDirection?: SentenceBaloonDirection;
  insight?: string;
};
