import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { TIERS } from "shared";

export const validateChapter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, seq, tier } = req.body;

  if (!TIERS.includes(tier)) {
    throw createHttpError(400, `Invalid tier '${tier}'`);
  }

  if (!title) {
    throw createHttpError(400, "Title must be provided");
  }

  if (!seq || seq <= 0) {
    throw createHttpError(400, "Seq must be a positive value");
  }

  next();
};
