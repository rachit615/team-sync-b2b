import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsInWorkspaceController,
  updateProjectController,
} from "../controllers/project.controller";

const projectRoutes = Router();

projectRoutes.post(
  "/workspace/:workspaceId/create-project",
  createProjectController
);

projectRoutes.put(
  "/workspace/:workspaceId/update-project/:projectId/",
  updateProjectController
);

projectRoutes.delete(
  "/workspace/:workspaceId/delete-project/:projectId/",
  deleteProjectController
);

projectRoutes.get(
  "/workspace/:workspaceId/all-projects",
  getAllProjectsInWorkspaceController
);

projectRoutes.get("/workspace/:workspaceId/project-analytics/:projectId");

export default projectRoutes;
