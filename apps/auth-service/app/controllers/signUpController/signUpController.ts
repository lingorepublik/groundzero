import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../../models/UserModel";
import { generateTokens, setRefreshTokenCookie } from "../../util";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const device = req.body.device || req.headers["user-agent"] || "unknown";
    const { email, password, termsConsent, tier } = req.body;

    if (!termsConsent) {
      throw createHttpError(
        400,
        "Failed to register. You must consent for terms.",
      );
    }

    if (!email || !password) {
      throw createHttpError(400, "Failed to register. invalid credentials");
    }

    const emailLowerCase = email.toLowerCase().trim();

    if (!validator.isEmail(emailLowerCase)) {
      throw createHttpError(400, "Failed to register. invalid credentials");
    }

    const isStrongPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!isStrongPassword) {
      throw createHttpError(400, "Failed to register. invalid credentials");
    }

    const user = await UserModel.create({
      email: emailLowerCase,
      password,
      tier,
      termsConsent,
    });

    const { token, refreshToken } = generateTokens(user);

    user.refreshTokens.push({
      token: refreshToken,
      device,
      createdAt: new Date(),
    });

    await user.save();

    setRefreshTokenCookie(res, refreshToken);

    res.send({ token });
  } catch (e) {
    next(e);
  }
};
