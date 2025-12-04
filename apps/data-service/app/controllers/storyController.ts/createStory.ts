import { Request, Response, NextFunction } from "express";
import { Story } from "../../models/StoryModel";

export const createStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const story = new Story(req.body);
    const savedStory = await story.save();
    res.send(savedStory);
  } catch (e) {
    next(e);
  }
};
