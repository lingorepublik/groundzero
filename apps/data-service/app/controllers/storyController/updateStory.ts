import { Request, Response, NextFunction } from "express";
import { StoryModel } from "../../models/StoryModel";
import createHttpError from "http-errors";

export const updateStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const updatedStory = await StoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStory) {
      throw createHttpError(400, `No story corresponding to the id ${id}`);
    }

    res.send(updatedStory);
  } catch (e) {
    next(e);
  }
};
