import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UserModel } from "../../models/UserModel";

export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const device = req.headers["user-agent"] || "unknown";
    const refreshToken = req.cookies.lr_rt;

    if (!refreshToken) {
      throw createHttpError(401, "Verification failed.");
    }

    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw createHttpError(500, "Internal Server Error.");
    }

    let payload: { userId: string };

    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as {
        userId: string;
      };
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw createHttpError(401, "Refresh token expired.");
      }

      throw createHttpError(401, "Verification failed.");
    }

    const user = await UserModel.findById(payload.userId);

    if (!user) {
      throw createHttpError(401, "Verification failed.");
    }

    const refreshTokenIndex = user.refreshTokens.findIndex(
      (tokenDoc) => tokenDoc.token === refreshToken,
    );

    if (refreshTokenIndex === -1) {
      throw createHttpError(401, "Verification failed.");
    }

    console.log(`Refresh token index: ${refreshTokenIndex}`);

    user.refreshTokens.splice(refreshTokenIndex, 1);

    const newRefreshToken = jwt.sign(
      { userId: payload.userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "15d" },
    );

    user.refreshTokens.push({
      token: newRefreshToken,
      device,
      createdAt: new Date(),
    });

    await user.save();

    res.cookie("lr_rt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 15,
    });

    const token = jwt.sign(
      { userId: user._id, tier: user.tier },
      process.env.JWT_SECRET,
      { expiresIn: "10m" },
    );

    res.send({ token, newRefreshToken });
  } catch (e) {
    next(e);
  }
};
