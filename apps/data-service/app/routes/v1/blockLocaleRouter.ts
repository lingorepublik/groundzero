import { Router } from "express";
import {
  getBlockLocalesByBlockId,
  upsertManyBlockLocale,
} from "../../controllers/blockLocaleController";

const blockLocaleRouter = Router();

blockLocaleRouter.get("/:id", getBlockLocalesByBlockId);
blockLocaleRouter.post("/", upsertManyBlockLocale);

export { blockLocaleRouter };
