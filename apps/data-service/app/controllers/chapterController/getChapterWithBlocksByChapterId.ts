import { Request, Response, NextFunction } from "express";
import { ChapterModel } from "../../models/ChapterModel";
import mongoose from "mongoose";

export const getChapterWithBlocksByChapterId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, lang } = req.params;

    const chapterWithBlocks = await ChapterModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          isDeleted: false,
          isPublished: true,
        },
      },
      {
        $lookup: {
          from: "chapterlocales",
          let: { chapterId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$chapterId", "$$chapterId"] },
                    { $eq: ["$lang", lang] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                titleTranslation: 1,
              },
            },
          ],
          as: "locales",
        },
      },
      {
        $unwind: {
          path: "$locales",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "blocks",
          let: { chapterId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$chapterId", "$$chapterId"] },
                    { $eq: ["$isDeleted", false] },
                    { $eq: ["$isPublished", true] },
                  ],
                },
              },
            },
            {
              $sort: {
                seq: 1,
              },
            },
            {
              $lookup: {
                from: "blocklocales",
                let: { blockId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$blockId", "$$blockId"] },
                          { $eq: ["$lang", lang] },
                        ],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      insight: 1,
                      sentenceTranslation: 1,
                    },
                  },
                ],
                as: "blockLevelLocales",
              },
            },
            {
              $unwind: {
                path: "$blockLevelLocales",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $addFields: {
                translation: "$blockLevelLocales.sentenceTranslation",
                insight: "$blockLevelLocales.insight",
              },
            },
            {
              $project: {
                // _id: 0,
                seq: 0,
                __v: 0,
                blockLevelLocales: 0,
                isDeleted: 0,
                isPublished: 0,
              },
            },
          ],
          as: "blocks",
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          locales: 1,
          blocks: 1,
        },
      },
    ]);

    res.send(chapterWithBlocks);
  } catch (e) {
    next(e);
  }
};
