import jwt from "jsonwebtoken";
import { config } from "../config/app.config";
import { Request, Response, NextFunction } from "express";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      (req as any).user = decoded;
      next();
      return;
    } catch (err) {
      res.status(403).json({ message: "Invalid token", isValid: false });
      return;
    }
  }

  res.status(401).json({ message: "Authorization token missing" });
};
