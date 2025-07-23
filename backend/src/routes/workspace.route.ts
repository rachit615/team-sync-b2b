import { Router } from "express";
import { getAllWorkspaceMembersController } from "../controllers/workspace.controller";

const workspaceRoutes = Router();

workspaceRoutes.get("/members/:id", getAllWorkspaceMembersController);

export default workspaceRoutes;
