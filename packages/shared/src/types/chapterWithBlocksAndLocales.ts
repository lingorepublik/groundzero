import { Block, SavedBlock } from "./block.ts";

export type FetchedBlock = Omit<
  SavedBlock,
  "seq" | "isDeleted" | "isPublished"
> & {
  insight?: string;
  translation?: string;
};

export type ChapterWithBlocksAndLocales = {
  blocks: FetchedBlock[];
  title: string;
  locales?: {
    titleTranslation: string;
  };
};
