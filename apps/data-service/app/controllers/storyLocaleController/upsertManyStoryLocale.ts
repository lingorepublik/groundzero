import { Request, Response, NextFunction } from "express";
import { StoryLocaleModel } from "../../models/StoryLocaleModel";
import { StoryLocale } from "shared";

export const upsertManyStoryLocale = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const operations = req.body.map((item: StoryLocale) => ({
      updateOne: {
        filter: { storyId: item.storyId, lang: item.lang },
        update: { $set: item },
        upsert: true,
      },
    }));

    const result = await StoryLocaleModel.bulkWrite(operations, {
      ordered: false,
    });

    res.send(result);
  } catch (e) {
    next(e);
  }
};
