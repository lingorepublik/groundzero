import { RequestHandler, Router } from "express";
import { getChaptersByStoryId } from "../../controllers/chaptersController";
import { verifyToken } from "../../middleware";

const chaptersRouter = Router();

chaptersRouter.get(
  "/:storyId",
  verifyToken as unknown as RequestHandler,
  getChaptersByStoryId as unknown as RequestHandler,
);

export { chaptersRouter };
