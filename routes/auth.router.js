import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authorization, requireRefreshToken } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/sign-in", authController.signIn);

authRouter.get("/user/info", authorization, authController.getUserInfo);
authRouter.get("/refresh", requireRefreshToken, authController.refreshToken);
authRouter.get("/sign-out", authController.signOut);
