import ProjectModel from "../models/project.model";

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
