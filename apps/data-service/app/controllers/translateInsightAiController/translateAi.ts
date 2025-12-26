import { Request, Response, NextFunction } from "express";
import { translateText } from "./LLMs/openAi/translateText";

export const translateAi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { text, langOrigin, langTarget } = req.body;
    const translatedText = await translateText(text, langOrigin, langTarget);

    res.send(translatedText);
  } catch (e) {
    next(e);
  }
};
