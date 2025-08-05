import TaskModel from "../models/task.model";
import UserModel from "../models/user.model";
import { NotFoundException } from "../utils/appError";

interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  projectId: string;
  workspaceId: string;
  createdBy: string;
  dueDate?: Date;
  assignedTo?: string;
}

export const createTaskService = async (data: CreateTaskInput) => {
  if (data.assignedTo) {
    const user = await UserModel.findById(data.assignedTo);
    if (!user) {
      throw new NotFoundException("Assigned user not found");
    }
  }
  const task = new TaskModel({
    title: data.title,
    description: data.description || null,
    priority: data.priority,
    status: data.status,
    project: data.projectId,
    workspace: data.workspaceId,
    createdBy: data.createdBy,
    dueDate: data.dueDate || null,
    assignedTo: data.assignedTo || null,
  });

  await task.save();
  return task;
};

export const updateTaskService = async (
  taskId: string,
  workspaceId: string,
  projectId: string,
  updateData: any
) => {
  const task = await TaskModel.findOneAndUpdate(
    {
      _id: taskId,
      workspace: workspaceId,
      project: projectId,
    },
    { $set: updateData },
    { new: true }
  );

  if (!task) {
    throw new NotFoundException("Task not found");
  }

  return task;
};

export const deleteTaskService = async (
  taskId: string,
  workspaceId: string
) => {
  const task = await TaskModel.findOneAndDelete({
    _id: taskId,
    workspace: workspaceId,
  });

  if (!task) {
    throw new NotFoundException("Task not found");
  }
};

export const getAllTasksService = async (
  workspaceId: string,
  filters: {
    projectId?: string;
    status?: string[];
    priority?: string[];
    assignedTo?: string[];
    keyword?: string;
    dueDate?: string;
  }
) => {
  const query: Record<string, any> = { workspace: workspaceId };

  if (filters.projectId) {
    query.project = filters.projectId;
  }
  if (filters.status) {
    query.status = { $in: filters.status };
  }
  if (filters.priority) {
    query.priority = { $in: filters.priority };
  }
  if (filters.assignedTo) {
    query.assignedTo = { $in: filters.assignedTo };
  }
  if (filters.keyword && filters.keyword !== undefined) {
    query.title = { $regex: filters.keyword, $options: "i" };
  }
  if (filters.dueDate) {
    query.dueDate = {
      $eq: new Date(filters.dueDate),
    };
  }

  return TaskModel.find(query)
    .sort({ createdAt: -1 })
    .populate("assignedTo", "name email -password")
    .populate("createdBy", "name email -password")
    .populate("project", "name");
};

export const getTaskByIdService = async (
  taskId: string,
  projectId: string,
  workspaceId: string
) => {
  const task = await TaskModel.findOne({
    _id: taskId,
    project: projectId,
    workspace: workspaceId,
  })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .populate("project", "name");

  if (!task) {
    throw new NotFoundException("Task not found");
  }

  return task;
};
