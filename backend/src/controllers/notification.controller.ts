import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTP_STATUS } from "../config/http.config";
import {
  getNotificationsService,
  markNotificationReadService,
} from "../services/notification.service";
import { z } from "zod";

const paginationSchema = z.object({
  pageSize: z.coerce.number().min(1).default(10),
  pageNumber: z.coerce.number().min(1).default(1),
});

export const getNotificationsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const parsed = paginationSchema.parse({
      pageSize: req.query.pageSize,
      pageNumber: req.query.pageNumber,
    });

    const result = await getNotificationsService(userId, parsed);

    return res.status(HTTP_STATUS.OK).json({
      message: "Notifications fetched successfully",
      ...result,
    });
  }
);

export const markNotificationReadController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const notificationId = z.string().parse(req.params.id);

    const notification = await markNotificationReadService(
      userId,
      notificationId
    );

    return res.status(HTTP_STATUS.OK).json({
      message: "Notification marked as read",
      notification,
    });
  }
);
