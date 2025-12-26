import { Router } from "express";
import {
  insightAi,
  translateAi,
} from "../../controllers/translateInsightAiController";

const translateInsightRouter = Router();

translateInsightRouter.post("/translate", translateAi);
translateInsightRouter.post("/insight", insightAi);

export { translateInsightRouter };
