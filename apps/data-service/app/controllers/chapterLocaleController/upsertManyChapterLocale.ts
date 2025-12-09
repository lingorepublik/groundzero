import { Request, Response, NextFunction } from "express";
import { ChapterLocale } from "shared";
import { ChapterLocaleModel } from "../../models/ChapterLocaleModel";

export const upsertManyChapterLocale = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const operations = req.body.map((item: ChapterLocale) => ({
      updateOne: {
        filter: { chapterId: item.chapterId, lang: item.lang },
        update: { $set: item },
        upsert: true,
      },
    }));

    const result = await ChapterLocaleModel.bulkWrite(operations, {
      ordered: false,
    });

    res.send(result);
  } catch (e) {
    next(e);
  }
};
