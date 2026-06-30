import { generateToken, generateRefreshToken } from "../utils/generateToken.ts";
import type { Request, Response } from "express";
import prisma from "../config/prisma.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import {
  editProfileSchema,
  loginSchema,
  signupSchema,
} from "../validators/user.validator.ts";

export const signup = async (req: Request, res: Response) => {
  try {
    // const { name, email, password } = req.body;

    // if (!name || !email || !password) {
    //   res.status(400).json({
    //     success: false,
    //     message: "All fields are required for Signup",
    //   });
    //   return;
    // }

    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Email already exists",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshTokenHash,
      },
    });

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      token,
      user,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "SignUp Failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // const { email, password } = req.body;

    // if (!email || !password) {
    //   res.status(400).json({
    //     success: false,
    //     message: "Provide Credentials",
    //   });
    //   return;
    // }

    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials, Email does not exist",
      });
      return;
    }

    const isMatch = bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials, Password Does not Match",
      });
      return;
    }

    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshTokenHash,
      },
    });

    res.status(201).json({
      success: true,
      message: "User Logged In Successfully",
      token,
      user,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  const id = req.user?.userId;
  // const role = req.user?.role
  // console.log("Role: ", role)
  // console.log("UserId: ",id)

  const userDetails = await prisma.user.findUnique({
    where: { id },
  });

  res.json({
    success: true,
    user: userDetails,
    role: req.user?.role,
  });
};

export const editProfile = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = editProfileSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { name, avatarUrl, nativeCountry } = parsed.data;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        avatarUrl,
        nativeCountry,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        nativeCountry: true,
        role: true,
        isPrivate: true,
        emailNotifications: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (e) {
    console.error("Error updating profile:", e);

    return res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user || !user.refreshTokenHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = generateToken(user.id, user.role);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch {
    res.status(401).json({
      success: false,
      message: "Refresh token expired",
    });
  }
};
