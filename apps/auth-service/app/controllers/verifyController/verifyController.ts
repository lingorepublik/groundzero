import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Tier } from "shared";

type JwtPayload = {
  userId: string;
  tier: Tier;
};

export const verifyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw createHttpError(401, "Verification failed.");
    }

    const [schema, token] = authHeader.split(" ");

    if (schema !== "Bearer" || !token) {
      throw createHttpError(401, "Verification failed.");
    }

    if (!process.env.JWT_SECRET) {
      throw createHttpError(500, "Internal server error.");
    }

    const { userId, tier } = jwt.verify(
      token,
      process.env.JWT_SECRET,
    ) as JwtPayload;

    res.send({ userId, tier });
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw createHttpError(401, "Token expired");
    }

    next(e);
  }
};
