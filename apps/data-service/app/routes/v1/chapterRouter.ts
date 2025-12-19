import { Router } from "express";
import {
  createChapter,
  getChaptersByStoryId,
  getChapterWithBlocksByChapterId,
  updateChapter,
  validateChapter,
} from "../../controllers/chapterController";

const chapterRouter = Router();

chapterRouter.get("/:storyId", getChaptersByStoryId);
chapterRouter.post("/", validateChapter, createChapter);
chapterRouter.put("/:id", validateChapter, updateChapter);
chapterRouter.get(
  "/chapter-with-blocks/:id/lang/:lang",
  getChapterWithBlocksByChapterId,
);

export { chapterRouter };
