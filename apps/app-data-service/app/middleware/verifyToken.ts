import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { AuthenticatedRequest } from "shared";

export const verifyToken = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw createHttpError(401, "Unauthorized");
    }

    const response = await fetch("http://localhost:2013/api/v1/verify", {
      method: "GET",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw createHttpError(401, "Unauthorized");
    }

    req.user = await response.json();

    next();
  } catch (e) {
    next(e);
  }
};
