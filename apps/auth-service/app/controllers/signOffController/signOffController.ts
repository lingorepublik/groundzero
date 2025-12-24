import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { UserModel } from "../../models/UserModel";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../../util";

export const signOffController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const device = req.body?.device || req.headers["user-agent"] || "unknown";
    const refreshToken = req.cookies.lr_rt;

    const payload = jwt.decode(refreshToken) as { userId: string };

    await UserModel.updateOne(
      {
        _id: payload.userId,
        "refreshTokens.token": refreshToken,
        "refreshTokens.device": device,
      },
      { $pull: { refreshTokens: { token: refreshToken } } },
    );

    res.clearCookie("lr_rt", cookieOptions);

    res.send("logged off");
  } catch (e) {
    next(e);
  }
};
