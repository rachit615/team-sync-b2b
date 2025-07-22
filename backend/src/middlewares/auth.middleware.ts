import jwt from "jsonwebtoken";
import { config } from "../config/app.config";
import { Request, Response, NextFunction } from "express";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      (req as any).user = decoded;
      return next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  }

  return res.status(401).json({ message: "Authorization token missing" });
};
