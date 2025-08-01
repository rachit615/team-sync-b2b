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
import memberRoutes from "./routes/member.route";
import workspaceRoutes from "./routes/workspace.route";
import projectRoutes from "./routes/project.route";
import { authenticateJWT } from "./middlewares/auth.middleware";
import taskRoutes from "./routes/task.route";

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
// For mobile device for temporary use added for testing
app.use(cors({ origin: true, credentials: true }));

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTP_STATUS.OK).json({ message: "Welcome to the API" });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/member`, memberRoutes);
app.use(`${BASE_PATH}/workspace`, workspaceRoutes);
app.use(`${BASE_PATH}/project`, authenticateJWT, projectRoutes);
app.use(`${BASE_PATH}/task`, authenticateJWT, taskRoutes);

// errorHandler middleware to be placed after all routes
app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
  await connectDB();
});
