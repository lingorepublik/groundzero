import { Router } from "express";
import {
  createBlock,
  getBlocksByChapterId,
} from "../../controllers/blockController";

const blockRouter = Router();

blockRouter.get("/:chapterId", getBlocksByChapterId);
blockRouter.post("/", createBlock);

export { blockRouter };
