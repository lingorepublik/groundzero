import { Request, Response, NextFunction } from "express";
import { BlockModel } from "../../models/BlockModel";

export const createBlock = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const block = await BlockModel.create(req.body);
    res.send(block);
  } catch (e) {
    next(e);
  }
};
