import { z } from "zod";

import { PackageStatus } from "@prisma/client";

const travelPackageBaseSchema = z.object({
  destinationId: z.string().uuid().optional(),

  name: z.string().max(255).optional(),

  description: z.string().optional(),

  from: z.string().optional(),

  startDate: z.coerce.date().optional(),

  endDate: z.coerce.date().optional(),

  originalPrice: z.coerce.number().positive().optional(),

  discountedPrice: z.coerce.number().positive().optional(),

  hasOffer: z.boolean().optional(),

  maxTravelers: z.coerce.number().int().positive().optional(),

  availableSlots: z.coerce.number().int().nonnegative().optional(),

  status: z.nativeEnum(PackageStatus).optional(),
});

export const createTravelPackageSchema =
  travelPackageBaseSchema
    .refine(
      (data) => {
        if (data.startDate && data.endDate) {
          return data.endDate >= data.startDate;
        }
        return true;
      },
      {
        message: "End date must be after start date",
        path: ["endDate"],
      }
    )
    .refine(
      (data) => {
        if (
          data.originalPrice &&
          data.discountedPrice
        ) {
          return (
            data.discountedPrice <=
            data.originalPrice
          );
        }
        return true;
      },
      {
        message:
          "Discounted price cannot be greater than original price",
        path: ["discountedPrice"],
      }
    );

export const updateTravelPackageSchema =
  travelPackageBaseSchema.partial();