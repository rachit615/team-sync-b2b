import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTP_STATUS } from "../config/http.config";
import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
} from "../services/task.service";
import mongoose from "mongoose";
import { NotFoundException, BadRequestException } from "../utils/appError";

export const createTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, workspaceId } = req.params;
    const { title, description, priority, status, dueDate, assignedTo } =
      req.body;

    if (
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(workspaceId)
    ) {
      throw new NotFoundException("Invalid workspace or project ID");
    }

    if (!title) {
      throw new BadRequestException("Task title is required");
    }

    const userId = req.user?.id;

    const task = await createTaskService({
      title,
      description,
      priority,
      status,
      projectId,
      workspaceId,
      createdBy: userId,
      dueDate,
      assignedTo,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      message: "Task created successfully",
      task,
    });
  }
);

export const updateTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, projectId, workspaceId } = req.params;
    const updateData = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(workspaceId)
    ) {
      throw new NotFoundException("Invalid IDs");
    }

    const updatedTask = await updateTaskService(
      id,
      workspaceId,
      projectId,
      updateData
    );
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Task updated", task: updatedTask });
  }
);

export const deleteTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(workspaceId)
    ) {
      throw new NotFoundException("Invalid task or workspace ID");
    }

    await deleteTaskService(id, workspaceId);
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Task deleted successfully" });
  }
);

export const getAllTasksController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId } = req.params;

    const filters = {
      projectId: req.query.projectId as string | undefined,
      status: req.query.status
        ? (req.query.status as string)?.split(",")
        : undefined,
      priority: req.query.priority
        ? (req.query.priority as string)?.split(",")
        : undefined,
      assignedTo: req.query.assignedTo
        ? (req.query.assignedTo as string)?.split(",")
        : undefined,
      keyword: req.query.keyword as string | undefined,
      dueDate: req.query.dueDate as string | undefined,
    };

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      throw new NotFoundException("Invalid workspace ID");
    }

    const tasks = await getAllTasksService(workspaceId, filters);
    return res.status(HTTP_STATUS.OK).json({ tasks });
  }
);

export const getTaskByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, projectId, workspaceId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(workspaceId)
    ) {
      throw new NotFoundException("Invalid IDs");
    }

    const task = await getTaskByIdService(id, projectId, workspaceId);
    return res.status(HTTP_STATUS.OK).json({ task });
  }
);
