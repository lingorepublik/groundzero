import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "shared";

/**
 * lang must be derived from the user
 * */
export const getChapterAndBlocksWithLocalesByChapterId = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    /**
     * use this data to make data user specific
     * */
    const { userId, tier } = req.user;

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
