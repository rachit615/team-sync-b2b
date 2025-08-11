import { Router } from "express";
import {
  getNotificationsController,
  markNotificationReadController,
} from "../controllers/notification.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const notificationRoutes = Router();

notificationRoutes.use(authenticateJWT);

notificationRoutes.get("/", getNotificationsController);
notificationRoutes.patch("/:id/read", markNotificationReadController);

export default notificationRoutes;
