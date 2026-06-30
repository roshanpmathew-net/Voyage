import type  { NextFunction, Response } from "express";
import type { AuthRequest } from "./auth.middleware.ts";
import { Role } from "@prisma/client";

export const authorizeRoles =
  (...roles: Role[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user?.role) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };