import { z } from "zod";

export const addPackageSchema = z.object({
  name: z.string().min(3, "Package name must be at least 3 characters"),
  from: z.string().min(2, "Origin is required"),
  to: z.string().min(2, "Destination is required"),
  cost: z.number().positive("Cost must be greater than 0"),
});

export type AddPackageFormData = z.infer<typeof addPackageSchema>;