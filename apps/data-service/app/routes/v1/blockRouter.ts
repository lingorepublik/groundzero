import { Router } from "express";
import {
  createBlock,
  getBlocksByChapterId,
  updateBlock,
} from "../../controllers/blockController";

const blockRouter = Router();

blockRouter.get("/:chapterId", getBlocksByChapterId);
blockRouter.post("/", createBlock);
blockRouter.put("/:id", updateBlock);

export { blockRouter };
