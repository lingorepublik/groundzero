import { Schema, model } from "mongoose";
import { TIERS } from "shared";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Failed to register. invalid credentials",
      },
    },
    password: { type: String, required: true },
    tier: {
      type: String,
      default: "free",
      enum: {
        values: TIERS,
        message: "Failed to register. invalid credentials",
      },
    },
    refreshTokens: [
      {
        token: { type: String, required: true },
        device: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const UserModel = model("User", userSchema);
