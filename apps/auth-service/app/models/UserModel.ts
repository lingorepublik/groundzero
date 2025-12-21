import { Schema, model, InferSchemaType, Document } from "mongoose";
import { TIERS } from "shared";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    isAnonymous: { type: Boolean, default: false },
    email: {
      type: String,
      required: function (this: { isAnonymous?: boolean }) {
        return !this.isAnonymous;
      },
      lowercase: true,
      trim: true,
      validate: {
        validator: (value?: string) => {
          if (!value) {
            return true;
          }
          return validator.isEmail(value);
        },
        message: "Failed to register. invalid credentials",
      },
    },
    password: {
      type: String,
      required: function (this: { isAnonymous?: boolean }) {
        return !this.isAnonymous;
      },
    },
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
    emailVerified: { type: Boolean, default: false },
    termsConsent: {
      type: Boolean,
      required: function (this: { isAnonymous?: boolean }) {
        return !this.isAnonymous;
      },
      validate: {
        validator: (value: boolean) => value,
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $exists: true, $type: "string" },
    },
  },
);

type UserType = InferSchemaType<typeof userSchema>;
export type UserDocument = UserType & Document;

userSchema.pre("save", async function (next) {
  if (this.isAnonymous) {
    return next();
  }
  if (!this.isModified("password")) {
    return next();
  }
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = function (password: string) {
  if (this.isAnonymous || !this.password) {
    return false;
  }
  return bcrypt.compare(password, this.password);
};

export const UserModel = model("User", userSchema);
