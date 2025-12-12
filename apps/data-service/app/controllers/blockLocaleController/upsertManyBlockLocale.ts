import { Request, Response, NextFunction } from "express";
import { BlockLocale, ChapterLocale } from "shared";
import { BlockLocaleModel } from "../../models/BlockLocaleModel";
import { ChapterLocaleModel } from "../../models/ChapterLocaleModel";

export const upsertManyBlockLocale = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const operations = req.body.map((item: BlockLocale) => ({
      updateOne: {
        filter: { blockId: item.blockId, lang: item.lang },
        update: { $set: item },
        upsert: true,
      },
    }));

    const result = await BlockLocaleModel.bulkWrite(operations, {
      ordered: false,
    });

    res.send(result);
  } catch (e) {
    next(e);
  }
};
