import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../../models/UserModel";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, tier } = req.body;

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

    await UserModel.create({
      email: emailLowerCase,
      password,
      tier,
    });

    res.send(`Registered successfully: ${emailLowerCase}`);
  } catch (e) {
    next(e);
  }
};
