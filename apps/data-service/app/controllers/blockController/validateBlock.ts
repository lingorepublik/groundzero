import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { Sentence } from "shared";

export const validateBlock = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { chapterId, seq, content } = req.body;

  if (!chapterId || chapterId.length < 1) {
    throw createHttpError(400, `ChapterId is required`);
  }

  if (!seq || seq <= 0) {
    throw createHttpError(400, "Seq must be a positive value");
  }

  // TODO: extend this validation to validate whether this is of type Illustration or Sentence
  // TODO: if the type is Illustration, send only ChapterId, seq, and content forward

  next();
};
