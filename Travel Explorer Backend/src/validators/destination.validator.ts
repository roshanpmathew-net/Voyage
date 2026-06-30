import { z } from "zod";

export const createDestinationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lat: z.number(),
  lng: z.number(),

  region: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  didYouKnow: z.string().optional(),
  budgetLevel: z.string().optional(),
  currency: z.string().length(3).optional(),
  visaDifficulty: z.string().optional(),
  bestTimeToVisit: z.string().optional(),
  averageTemperature: z.string().optional(),
  colorHex: z.string().optional(),

  highlights: z.array(z.string()).optional(),
  famousFor: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),

  topAttractions: z.any().optional(),
});

export const updateDestinationSchema = z.object({
  name: z.string().min(1).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),

  region: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  didYouKnow: z.string().optional(),
  budgetLevel: z.string().optional(),
  currency: z.string().length(3).optional(),
  visaDifficulty: z.string().optional(),
  bestTimeToVisit: z.string().optional(),
  averageTemperature: z.string().optional(),
  colorHex: z.string().optional(),

  highlights: z.array(z.string()).optional(),
  famousFor: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),

  topAttractions: z.any().optional(),
});



export const viewDestinationSchema = z.object({
  name: z.string().trim().optional(),

  region: z.string().trim().optional(),

  budgetLevel: z
    .enum(["Budget", "Mid-range", "Luxury"])
    .optional(),

  languages: z.string().trim().optional(),

  currency: z
    .string()
    .length(3, "Currency must be a 3-letter code")
    .transform((val) => val.toUpperCase())
    .optional(),

  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  sortBy: z
    .enum([
      "createdAt",
      "name",
      "region",
      "budgetLevel",
    ])
    .default("createdAt"),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});