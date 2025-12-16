import { Router } from "express";
import { getChaptersByStoryId } from "../../controllers/chaptersController";

const chaptersRouter = Router();

chaptersRouter.get("/:storyId", getChaptersByStoryId);

export { chaptersRouter };
