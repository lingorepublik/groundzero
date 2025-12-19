import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../../models/UserModel";

export const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password1, password2 } = req.body;

    if (!email || !password1 || !password2 || password1 !== password2) {
      throw createHttpError(401, "Password change not successful");
    }

    const isStrongPassword = validator.isStrongPassword(password1, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!isStrongPassword) {
      throw createHttpError(401, "Password change not successful");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw createHttpError(401, "Password change not successful");
    }

    user.password = password1;

    await user.save();

    res.send("Password changed successfullyyy");
  } catch (e) {
    next(e);
  }
};
