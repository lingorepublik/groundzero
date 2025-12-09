import { Router } from "express";
import {
  createChapter,
  getChaptersByStoryId,
  updateChapter,
  validateChapter,
} from "../../controllers/chapterController";

const chapterRouter = Router();

chapterRouter.get("/:storyId", getChaptersByStoryId);
chapterRouter.post("/", validateChapter, createChapter);
chapterRouter.put("/:id", validateChapter, updateChapter);

export { chapterRouter };
