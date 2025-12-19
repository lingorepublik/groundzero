import { Router } from "express";
import { getChapterAndBlocksWithLocalesByChapterId } from "../../controllers/chapterController";

const chapterRouter = Router();

chapterRouter.get("/:chapterId", getChapterAndBlocksWithLocalesByChapterId);

export { chapterRouter };
