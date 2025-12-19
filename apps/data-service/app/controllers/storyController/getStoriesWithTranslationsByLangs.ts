import { Request, Response, NextFunction } from "express";
import { StoryModel } from "../../models/StoryModel";

export const getStoriesWithTranslationsByLangs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { langOrigin, langTarget } = req.params;

    console.log(langOrigin, langTarget);

    const abc = await StoryModel.aggregate([
      {
        $match: {
          isDeleted: false,
          isPublished: true,
          lang: langOrigin,
        },
      },
      {
        $sort: {
          seq: 1,
        },
      },
      {
        $lookup: {
          from: "storylocales",
          let: { storyId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$storyId", "$$storyId"] },
                    { $eq: ["$lang", langTarget] },
                  ],
                },
              },
            },
          ],
          as: "locale",
        },
      },
      {
        $unwind: "$locale",
      },
      {
        $addFields: {
          titleTranslation: "$locale.titleTranslation",
          storyId: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
          seq: 0,
          lang: 0,
          createdAt: 0,
          updatedAt: 0,
          isDeleted: 0,
          isPublished: 0,
          __v: 0,
          locale: 0,
        },
      },
    ]);

    res.send(abc);
  } catch (e) {
    next(e);
  }
};
