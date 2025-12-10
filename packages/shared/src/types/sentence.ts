export type SentenceSection = {
  word: string;
  lemma?: string;
  refIndex?: number;
  punctuationMark?: boolean;
};

export type Sentence = Array<SentenceSection>;
