import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import WorkspaceModel from "../models/workspace.model";
import { NotFoundException } from "../utils/appError";

export const getAllWorkspaceMembersService = async (workspaceId: string) => {
  const workspace = await WorkspaceModel.findOne({ _id: workspaceId }).exec();
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  const members = await MemberModel.find({ workspaceId: workspace._id })
    .populate("role", "name")
    .populate("userId", "email name profilePicture -password")
    .lean()
    .exec();

  const formattedMembers = members.map(({ userId, ...rest }) => ({
    ...rest,
    user: userId,
  }));
  const roles = await RoleModel.find({}, { name: 1, _id: 1 })
    .select("-permissions")
    .lean()
    .exec();

  return { members: formattedMembers, roles };
};
