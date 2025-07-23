import { r } from "react-router/dist/development/fog-of-war-oa9CGk10";
import { Roles } from "../enums/role.enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import WorkspaceModel from "../models/workspace.model";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const joinWorkspaceByInviteService = async (
  inviteCode: string,
  userId: string
) => {
  const workspace = await WorkspaceModel.findOne({ inviteCode: inviteCode });
  if (!workspace) {
    throw new NotFoundException("Invalid invite code or workspace not found");
  }

  const existingMember = await MemberModel.findOne({
    workspaceId: workspace._id,
    userId: userId,
  }).exec();

  if (existingMember) {
    throw new BadRequestException("You are already a member of this workspace");
  }

  const role = await RoleModel.findOne({ name: Roles.MEMBER }).exec();

  const member = new MemberModel({
    userId: userId,
    workspaceId: workspace._id,
    role: role?._id,
  });

  await member.save();

  return { workspaceId: workspace._id, role: role?.name };
};
