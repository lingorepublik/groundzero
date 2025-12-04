import { Request, Response, NextFunction } from "express";
import { LANGUAGES } from "shared";
import { Story } from "../../models/StoryModel";
import createHttpError from "http-errors";

export const getStoriesByLang = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { lang } = req.params;

    if (!LANGUAGES.includes(lang as (typeof LANGUAGES)[number])) {
      throw createHttpError(400, `${lang} is not a valid language`);
    }

    const stories = await Story.find({ lang, isDeleted: false }).sort({
      seq: 1,
    });

    res.send(stories);
  } catch (e) {
    next(e);
  }
};
