import { type Request, type Response, type NextFunction } from "express";
import { Article } from "../../models/ArticleModel";

export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const abc = await Article.create({
      lang: "de",
      title: "nach Berlin",
      tier: "free",
      seq: 5,
      level: "A1",
      note: "Sein mit perfect",
    });
    console.log(abc);
    res.json({ msg: "in create article" });
  } catch (e) {
    next(e);
  }
};

// type ArticleSchemaType = {
//   lang: Language;
//   title: string;
//   tier: Tier;
//   seq: number;
//   level: Level;
//   note?: string;
// };
