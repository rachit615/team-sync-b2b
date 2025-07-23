import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { joinWorkspaceByInviteService } from "../services/member.service";
import { HTTP_STATUS } from "../config/http.config";
import { z } from "zod";

export const joinWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const inviteCode = z.string().parse(req.params.inviteCode);
    const userId = req.body.userId;

    const { workspaceId, role } = await joinWorkspaceByInviteService(
      inviteCode,
      userId
    );

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Workspace joined successfully", workspaceId, role });
  }
);
