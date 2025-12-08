import { Router } from "express";
import {
  getChapterLocalesByChapterId,
  upsertManyChapterLocale,
} from "../../controllers/chapterLocaleController";

const chapterLocaleRouter = Router();

chapterLocaleRouter.get("/:id", getChapterLocalesByChapterId);
chapterLocaleRouter.post("/", upsertManyChapterLocale);

export { chapterLocaleRouter };
