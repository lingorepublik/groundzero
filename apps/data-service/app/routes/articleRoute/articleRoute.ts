import { Router } from "express";
import { createArticle, getArticle } from "../../controllers/articleController";

const articleRouter = Router();

articleRouter.get("/", getArticle);
articleRouter.post("/", createArticle);

export { articleRouter };
