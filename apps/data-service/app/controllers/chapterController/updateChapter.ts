import { Request, Response, NextFunction } from "express";
import { ChapterModel } from "../../models/ChapterModel";
import createHttpError from "http-errors";

export const updateChapter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const updatedChapter = await ChapterModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedChapter) {
      throw createHttpError(400, `No chapter corresponding to the id ${id}`);
    }

    res.send(updatedChapter);
  } catch (e) {
    next(e);
  }
};
