import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";

export const getAllWorkspaceMembersController = asyncHandler(
  async (req: Request, res: Response) => {}
);
