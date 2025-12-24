import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { UserDocument } from "../models/UserModel";

export const generateTokens = (user: UserDocument) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw createHttpError(500);
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, tier: user.tier },
    process.env.JWT_SECRET,
    { expiresIn: "10m" },
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "15d" },
  );

  return { token, refreshToken };
};
