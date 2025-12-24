import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "shared";

export const getStoriesWithTranslationsByLangs = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  /**
   * lang-origin: language of the stories
   * lang-target: language of the translations
   * languages shall get from the fetched user
   * */
  try {
    /**
     * use this data to make data user specific
     * */
    const { userId, tier } = req.user;

    const response = await fetch(
      `http://localhost:3013/api/v1/story/translations/lang-origin/de-DE/lang-target/en-US`,
    );

    const data = await response.json();

    const stories = data.map((story: any) => ({
      ...story,
      progressList: [],
      trophyProgress: 0,
      starredTrophyProgress: 0,
    }));

    res.send(stories);
  } catch (e) {
    next(e);
  }
};
