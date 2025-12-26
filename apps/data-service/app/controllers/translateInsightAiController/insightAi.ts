import { Request, Response, NextFunction } from "express";
import { translateText } from "./LLMs/openAi/translateText";
import { generateInsight } from "./LLMs/openAi/generateInsight";

export const insightAi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { text, langOrigin, langTarget } = req.body;
    const insight = await generateInsight(text, langOrigin, langTarget);
    console.log(insight);

    res.send(insight);
  } catch (e) {
    next(e);
  }
};
