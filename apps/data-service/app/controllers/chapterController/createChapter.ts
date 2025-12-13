import { Request, Response, NextFunction } from "express";
import { ChapterModel } from "../../models/ChapterModel";

export const createChapter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chapter = new ChapterModel(req.body);
    const savedChapter = await chapter.save();
    res.send(savedChapter);
  } catch (e) {
    next(e);
  }
};
