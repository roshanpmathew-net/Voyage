import { z } from "zod";
import { Status } from "@prisma/client";

export const addgalleryImageSchema = z.object({
  imageUrl: z
    .string()
    .url("Invalid image URL")
    .max(2048, "Image URL is too long"),

  caption: z
    .string()
    .max(1000, "Caption cannot exceed 1000 characters")
    .optional(),
});

export const updategalleryImageSchmea = z.object({
  uploadedBy: z.string().uuid().optional(),

  destinationId: z.string().uuid({
    message: "Invalid destination ID",
  }),

  imageUrl: z
    .string()
    .url("Invalid image URL")
    .max(2048, "Image URL is too long"),

  caption: z
    .string()
    .max(1000, "Caption cannot exceed 1000 characters")
    .optional(),

  status: z.nativeEnum(Status).optional(),
  reviewedBy: z.string().uuid().optional(),

  reviewedAt: z.coerce.date().optional(),
});
