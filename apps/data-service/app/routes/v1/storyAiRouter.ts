import { Router } from "express";
import { createStoryAi } from "../../controllers/storyAiController";

const storyAiRouter = Router();

storyAiRouter.post("/", createStoryAi);

export { storyAiRouter };
