import { Request, Response, NextFunction } from "express";

/**
 * lang must be derived from the user
 * */
export const getChapterAndBlocksWithLocalesByChapterId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { chapterId } = req.params;
    const response = await fetch(
      `http://localhost:3013/api/v1/chapter/chapter-with-blocks/${chapterId}/lang/en-US`,
    );

    const data = await response.json();

    res.send(data[0]);
  } catch (e) {
    next(e);
  }
};
