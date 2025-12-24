import { RequestHandler, Router } from "express";
import { getChapterAndBlocksWithLocalesByChapterId } from "../../controllers/chapterController";
import { verifyToken } from "../../middleware";

const chapterRouter = Router();

chapterRouter.get(
  "/:chapterId",
  verifyToken as unknown as RequestHandler,
  getChapterAndBlocksWithLocalesByChapterId as unknown as RequestHandler,
);

export { chapterRouter };
