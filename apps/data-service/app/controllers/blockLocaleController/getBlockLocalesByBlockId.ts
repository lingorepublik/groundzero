import { Request, Response, NextFunction } from "express";
import { BlockLocaleModel } from "../../models/BlockLocaleModel";

export const getBlockLocalesByBlockId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const locales = await BlockLocaleModel.find({ blockId: id });

    res.send(locales);
  } catch (e) {
    next(e);
  }
};
