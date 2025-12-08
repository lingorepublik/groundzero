import { Request, Response, NextFunction } from "express";
import { ChapterLocaleModel } from "../../models/ChapterLocaleModel";

export const getChapterLocalesByChapterId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const locales = await ChapterLocaleModel.find({ chapterId: id });

    res.send(locales);
  } catch (e) {
    next(e);
  }
};
