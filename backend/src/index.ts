import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "./config/app.config";
import session from "cookie-session";
import connectDB from "./config/database.config";
import { HTTP_STATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import passport from "passport";

import "./config/passport.config";
import authRoutes from "./routes/auth.route";

dotenv.config();

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax",
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: config.FRONTEND_ORIGIN, credentials: true }));

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTP_STATUS.OK).json({ message: "Welcome to the API" });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);

// errorHandler middleware to be placed after all routes
app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
  await connectDB();
});
