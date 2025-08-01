import ProjectModel from "../models/project.model";
import TaskModel from "../models/task.model";
import { NotFoundException } from "../utils/appError";

export const createProejctService = async (
  userId: string,
  workspaceId: string,
  body: any
) => {
  const project = new ProjectModel({
    ...(body.emoji && { emoji: body.emoji }),
    name: body.name,
    description: body.description,
    workspace: workspaceId,
    createdBy: userId,
  });

  await project.save();

  return { project };
};

export const getAllProjectsInWorkspaceService = async (workspaceId: string) => {
  return ProjectModel.find({ workspace: workspaceId })
    .sort({ createdAt: -1 })
    .lean();
};

export const updateProjectService = async (
  projectId: string,
  workspaceId: string,
  data: { name?: string; description?: string; emoji?: string }
) => {
  const project = await ProjectModel.findOneAndUpdate(
    { _id: projectId, workspace: workspaceId },
    { $set: data },
    { new: true }
  );

  if (!project) {
    throw new NotFoundException("Project not found");
  }

  return project;
};

export const deleteProjectService = async (
  projectId: string,
  workspaceId: string
) => {
  const project = await ProjectModel.findOneAndDelete({
    _id: projectId,
    workspace: workspaceId,
  });

  if (!project) {
    throw new NotFoundException("Project not found");
  }

  await TaskModel.deleteMany({ project: projectId });
};

export const getProjectAnalyticsService = async (
  projectId: string,
  workspaceId: string
) => {};
