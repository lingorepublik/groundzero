import { Router } from "express";
import {
  upsertManyStoryLocale,
  getStoryLocalesByStoryId,
} from "../../controllers/storyLocaleController";

const storyLocaleRouter = Router();

storyLocaleRouter.post("/", upsertManyStoryLocale);
storyLocaleRouter.get("/:id", getStoryLocalesByStoryId);

export { storyLocaleRouter };
