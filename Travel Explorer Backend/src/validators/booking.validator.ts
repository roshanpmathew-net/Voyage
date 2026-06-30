import z from "zod";

export const travelerSchema = z.object({
  name: z.string().min(2),
  age: z.number().int().min(0),
  gender: z.enum(["Male", "Female", "Other"]),
});

export const createBookingSchema = z
  .object({
    packageId: z.string().uuid(),
    travelerCount: z.number().int().min(1),
    travelers: z.array(travelerSchema),
  })
  .refine(
    (data) => data.travelers.length === data.travelerCount,
    {
      path: ["travelers"],
      message: "Traveler count must match travelers array",
    }
  );