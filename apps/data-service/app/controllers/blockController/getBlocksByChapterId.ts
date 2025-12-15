import { Request, Response, NextFunction } from "express";
import { BlockModel } from "../../models/BlockModel";

export const getBlocksByChapterId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { chapterId } = req.params;
    const blocks = await BlockModel.find({
      chapterId: chapterId,
      isDeleted: false,
    }).sort({
      seq: 1,
    });

    res.send(blocks);
  } catch (e) {
    next(e);
  }
};
