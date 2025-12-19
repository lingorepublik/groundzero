import { Router } from "express";
import { getStoriesWithTranslationsByLangs } from "../../controllers/storiesController";

const storiesRouter = Router();

storiesRouter.get("/", getStoriesWithTranslationsByLangs);

export { storiesRouter };
