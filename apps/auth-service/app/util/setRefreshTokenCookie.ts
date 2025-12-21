import { Response } from "express";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: (process.env.NODE_ENV === "production" ? "strict" : "lax") as
    | "strict"
    | "lax",
  maxAge: 60 * 60 * 24 * 15,
  path: "/",
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie("lr_rt", refreshToken, cookieOptions);
};
