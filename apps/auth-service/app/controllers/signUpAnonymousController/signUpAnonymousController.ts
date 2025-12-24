import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { UserModel } from "../../models/UserModel";
import { generateTokens, setRefreshTokenCookie } from "../../util";

export const signUpAnonymousController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserModel.create({
      isAnonymous: true,
    });

    const { token, refreshToken } = generateTokens(user);

    user.refreshTokens.push({ token: refreshToken });

    await user.save();

    setRefreshTokenCookie(res, refreshToken);

    res.send({ token });
  } catch (e) {
    next(e);
  }
};
