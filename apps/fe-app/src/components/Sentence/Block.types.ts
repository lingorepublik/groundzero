import type { BalloonDirection, BalloonType } from "shared";

export type WordUnit = {
  word: string;
  translation?: string;
  insight?: string;
  punctuationMark?: boolean;
  refIndex?: number;
};

export type Block = {
  content: Array<WordUnit>;
  translation?: string;
  character?: string;
  balloonType?: BalloonType;
  balloonDirection?: BalloonDirection;
  insight?: string;
};
