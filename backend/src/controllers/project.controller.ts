import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTP_STATUS } from "../config/http.config";
import { NotFoundException } from "../utils/appError";
import { createProejctService } from "../services/project.service";
import WorkspaceModel from "../models/workspace.model";
import mongoose from "mongoose";

export const createProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, emoji } = req.body;
    const workspaceId = req.params.workspaceId;

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      throw new NotFoundException("Invalid workspace ID format");
    }

    const workspace = await WorkspaceModel.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException("Workspace not found");
    }

    if (!name) {
      throw new NotFoundException("Project name is required");
    }

    const userId = req.user?.id;

    const { project } = await createProejctService(
      userId,
      workspaceId,
      req.body
    );

    return res.status(HTTP_STATUS.CREATED).json({
      message: "Project created successfully",
      project,
    });
  }
);

export const getAllProjectsInWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const getProjectByIdAndWorkspaceIdController = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const getProjectAnalyticsController = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const updateProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, emoji } = req.body;
    const workspaceId = req.params.workspaceId;
    const projectId = req.params.projectId;
  }
);

export const deleteProjectController = asyncHandler(
  async (req: Request, res: Response) => {}
);
