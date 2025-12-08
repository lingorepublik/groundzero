import { Request, Response, NextFunction } from "express";
import { ChapterModel } from "../../models/ChapterModel";

export const getChaptersByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { storyId } = req.params;
    const chapters = await ChapterModel.find({
      storyId: storyId,
      isDeleted: false,
    }).sort({
      seq: 1,
    });
    res.send(chapters);
  } catch (e) {
    next(e);
  }
};
