import { Block } from "./block.ts";

export type FetchedBlock = Omit<Block, "seq" | "isDeleted" | "isPublished"> & {
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
