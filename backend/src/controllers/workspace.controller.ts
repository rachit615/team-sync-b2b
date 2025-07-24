import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { getAllWorkspaceMembersService } from "../services/workspace.service";
import { HTTP_STATUS } from "../config/http.config";

export const getAllWorkspaceMembersController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = req.params.id;
    const { members, roles } = await getAllWorkspaceMembersService(workspaceId);

    return res.status(HTTP_STATUS.OK).json({
      message: "Workspace members fetched successfully",
      members,
      roles,
    });
  }
);
