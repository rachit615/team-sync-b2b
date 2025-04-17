import { ErrorRequestHandler } from "express";
import { HTTP_STATUS } from "../config/http.config";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.error(`Error occured on PATH: ${req.path} `, err);

  if (err instanceof SyntaxError) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid JSON format. Please check your request." });
  }
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: err.message || "Unknown error occured",
  });
};
