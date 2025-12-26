import { Router } from "express";
import { createSentenceSectionsAi } from "../../controllers/sentenceSectionsAi/createSentenceSectionsAi";

const sentenceSectionAiRouter = Router();

sentenceSectionAiRouter.post("/", createSentenceSectionsAi);

export { sentenceSectionAiRouter };
