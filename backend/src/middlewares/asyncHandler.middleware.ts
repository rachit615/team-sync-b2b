import { Response, Request, NextFunction } from "express";

type AsyncControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;
// HOF - high order function OR function wrapper

export const asyncHandler =
  (controller: AsyncControllerType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
