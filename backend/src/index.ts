import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "./config/app.config";
import session from "cookie-session";

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
app.use(cors({ origin: config.FRONTEND_ORIGIN, credentials: true }));

app.listen(config.PORT, () => {
  console.log(
    `Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
});
