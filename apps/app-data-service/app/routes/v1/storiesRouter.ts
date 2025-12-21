import { RequestHandler, Router } from "express";
import { getStoriesWithTranslationsByLangs } from "../../controllers/storiesController";
import { verifyToken } from "../../middleware";

const storiesRouter = Router();

storiesRouter.get(
  "/",
  verifyToken as unknown as RequestHandler,
  getStoriesWithTranslationsByLangs as unknown as RequestHandler,
);

export { storiesRouter };
