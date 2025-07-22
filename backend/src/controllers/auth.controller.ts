import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { config } from "../config/app.config";
import { HTTP_STATUS } from "../config/http.config";
import {
  registerUserService,
  verifyUserService,
} from "../services/auth.service";
// import passport from "passport";
import jwt from "jsonwebtoken";
import { registerSchema } from "../validation/auth.validation";

export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const currentWorkspace = req.user?.currentWorkspace;

    if (!currentWorkspace) {
      return res.redirect(
        `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
      );
    }

    return res.redirect(
      `${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
    );
  }
);

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });

    await registerUserService(body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: "User created successfully",
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await verifyUserService({ email, password });
      // signing off jwt toiken with info and jwt secret
      const token = jwt.sign(
        { id: user._id, email: user.email },
        config.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Logged in successfully",
        token,
        user,
      });
    } catch (error: any) {
      return res.status(401).json({
        message: error?.message || "Invalid email or password",
      });
    }
  }
);

export const logOutController = asyncHandler(
  async (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json({ error: "Failed to log out" });
      }
    });

    req.session = null;
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Logged out successfully" });
  }
);
