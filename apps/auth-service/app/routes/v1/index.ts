import { Router } from "express";
import { signUpRouter } from "./signUpRouter";
import { signInRouter } from "./signInRouter";
import { verifyRouter } from "./verifyRouter";
import { refreshRouter } from "./refreshRouter";
import { passwordChangeRouter } from "./passwordChangeRouter";
import { signOffRouter } from "./signOffRouter";
import { signUpAnonymousRouter } from "./signUpAnonymousRouter";

const v1Router = Router();

v1Router.use("/sign-up", signUpRouter);
v1Router.use("/sign-in", signInRouter);
v1Router.use("/sign-off", signOffRouter);
v1Router.use("/verify", verifyRouter);
v1Router.use("/refresh", refreshRouter);
v1Router.use("/password-change", passwordChangeRouter);
v1Router.use("/sign-up-anonymous", signUpAnonymousRouter);

export { v1Router };
