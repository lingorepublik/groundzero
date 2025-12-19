import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { UserModel } from "../../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const device = req.body.device || req.headers["user-agent"] || "unknown";

    if (!email || !password) {
      throw createHttpError(400, "Login failed, invalid credentials.");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw createHttpError(401, "Login failed, invalid credentials.");
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (!validUser) {
      throw createHttpError(401, "Login failed, invalid credentials.");
    }

    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw createHttpError(500);
    }

    const token = jwt.sign(
      { userId: user._id, tier: user.tier },
      process.env.JWT_SECRET,
      { expiresIn: "10m" },
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "15d" },
    );

    const refreshTokenIndex = user.refreshTokens.findIndex(
      (token) => token.device === device,
    );

    if (refreshTokenIndex > -1) {
      const tokenDocument = user.refreshTokens[refreshTokenIndex];
      tokenDocument?.set({
        token: refreshToken,
        device,
        createdAt: new Date(),
      });
    } else {
      user.refreshTokens.push({
        token: refreshToken,
        device,
        createdAt: new Date(),
      });
    }

    await user.save();

    res.cookie("lr_rt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 15,
    });

    res.send({
      token,
    });
  } catch (e) {
    next(e);
  }
};
