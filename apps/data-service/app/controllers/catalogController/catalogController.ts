import { type Request, type Response, type NextFunction } from "express";

export const catalogController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json([
      {
        link: "/article/nach-berlin/2",
        progressList: [0.2, 0.5, 1, 1, 0],
        trophyProgress: 0.7,
        starredTrophyProgress: 0,
        title: "nach Berlin",
        titleTranslation: "to Berlin",
        note: "perfect mit Sein",
      },
      {
        link: "/article/nach-berlin/2",
        progressList: [0.2, 0.5, 1, 1, 0],
        trophyProgress: 0.7,
        starredTrophyProgress: 0,
        title: "nach Berlinnnn",
        titleTranslation: "to Berlin",
        note: "perfect mit Sein",
      },
    ]);
  } catch (e) {
    next(e);
  }
};
