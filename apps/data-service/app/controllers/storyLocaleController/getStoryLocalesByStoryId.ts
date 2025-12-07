import { Request, Response, NextFunction } from "express";
import { StoryLocaleModel } from "../../models/StoryLocaleModel";

export const getStoryLocalesByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const locales = await StoryLocaleModel.find({ storyId: id });
    res.send(locales);
  } catch (e) {
    next(e);
  }
};
