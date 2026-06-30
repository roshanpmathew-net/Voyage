import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role?: Role;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // console.log('Authenticating...')
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: Role;
    };

    req.user = decoded;

    // console.log("Decoded: ", decoded)

    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      message: "Token Expired",
    });
  }
};
