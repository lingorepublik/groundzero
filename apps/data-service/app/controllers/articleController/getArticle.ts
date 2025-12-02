import { type Request, type Response, type NextFunction } from "express";

export const getArticle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ msg: "in get article" });
  } catch (e) {
    next(e);
  }
};
