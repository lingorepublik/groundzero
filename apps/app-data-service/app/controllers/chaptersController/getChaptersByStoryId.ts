import { Request, Response, NextFunction } from "express";
import { Chapter, ChapterNavItemUI } from "shared";

/**
 * TODOs
 * isActive: has to be calculated based on users progress level
 * progress : has to calculated based on users quiz success
 * isDisabled: true if starred and the use is not a premium
 * chapterId shall be added to starred chapters only if the use is subscribed
 * */

export const getChaptersByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { storyId } = req.params;
    const response = await fetch(
      `http://localhost:3013/api/v1/chapter/${storyId}`,
    );

    const data: Array<Chapter & { _id: string }> = await response.json();

    const publishedChapters = data.filter((chapter) => chapter.isPublished);

    const navItems: ChapterNavItemUI[] = publishedChapters.map(
      (chapter, index) => ({
        chapterId: chapter._id,
        number: index + 1,
        progress: 0,
        isActive: index === 0,
        isDisabled: false,
        isStarred: chapter.tier === "starred",
      }),
    );

    res.send(navItems);
  } catch (e) {
    next(e);
  }
};
