import { Request, Response, NextFunction } from "express";
import { BlockModel } from "../../models/BlockModel";
import createHttpError from "http-errors";

export const updateBlock = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const updatedBlock = await BlockModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlock) {
      throw createHttpError(400, "Failed to update block");
    }

    res.send(updatedBlock);
  } catch (e) {
    next(e);
  }
};
