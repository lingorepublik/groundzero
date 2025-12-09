import { Request, Response, NextFunction } from "express";
import { LEVELS, TIERS } from "shared";
import createHttpError from "http-errors";

export const validateStory = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { lang, level, tier, title, seq } = req.body;

  const allowedLevels = LEVELS[
    lang as keyof typeof LEVELS
  ] as readonly string[];

  if (!allowedLevels) {
    throw createHttpError(400, "Invalid language");
  }

  if (!allowedLevels.includes(level)) {
    throw createHttpError(
      400,
      `Level ${level} in not valid for language ${lang}`,
    );
  }

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
