import prisma from "../config/prisma.ts";
import type { Request, Response } from "express";
import type { AuthRequest } from "./admin.controller";
import {
  PackageStatus,
  Prisma,
  PaymentStatus,
  BookingStatus,
} from "@prisma/client";
import razorpay from "../config/razorpay.ts";
import { createBookingSchema } from "../validators/booking.validator.ts";
import crypto from "crypto";

export const addToFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const destinationId = String(req.params.id);
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const destination = await prisma.destination.findUnique({
      where: { id: destinationId },
      select: { id: true },
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_destinationId: {
          userId,
          destinationId,
        },
      },
    });

    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: "Destination already in favorites",
      });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        destinationId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Added to favorites",
      data: favorite,
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);

    return res.status(500).json({
      success: false,
      message: "Error adding to favorites",
    });
  }
};

export const removeFromFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const destinationId = String(req.params.id);
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const destination = await prisma.destination.findUnique({
      where: { id: destinationId },
      select: { id: true },
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_destinationId: {
          userId,
          destinationId,
        },
      },
    });

    if (!existingFavorite) {
      return res.status(409).json({
        success: false,
        message: "Destination not in Favorites",
      });
    }

    await prisma.favorite.delete({
      where: {
        userId_destinationId: {
          userId,
          destinationId,
        },
      },
    });
  } catch (error) {
    console.error("Error deleting from favorites:", error);

    return res.status(500).json({
      success: false,
      message: "Error deleting from favorites",
    });
  }
};

export const viewTourPacks = async (req: AuthRequest, res: Response) => {
  try {
    const {
      destinationId,
      status,
      hasOffer,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      page = "1",
      limit = "10",
      sortBy = "createdAt",
      sortOrder = "desc",
      from: fromQuery,
    } = req.query;

    const where: Prisma.TravelPackageWhereInput = {};

    let fromValue: string | undefined;

    if (fromQuery) {
      fromValue = String(fromQuery);
    } else if (req.user?.userId) {
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: { nativeCountry: true },
      });

      if (user?.nativeCountry) {
        fromValue = user.nativeCountry;
      }
    }

    // Filter by destination
    if (destinationId) {
      where.destinationId = String(destinationId);
    }

    // Filter by from
    if (fromValue) {
      where.from = fromValue;
    }

    // Filter by status
    if (
      status &&
      Object.values(PackageStatus).includes(status as PackageStatus)
    ) {
      where.status = status as PackageStatus;
    }

    // Filter by offer
    if (hasOffer !== undefined) {
      const offerBool = String(hasOffer).toLowerCase() === "true";

      if (offerBool) {
        where.discountedPrice = {
          not: null,
        };
      } else {
        where.discountedPrice = null;
      }
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      const priceFilter: Prisma.DecimalNullableFilter = {};

      if (minPrice) {
        priceFilter.gte = new Prisma.Decimal(String(minPrice));
      }

      if (maxPrice) {
        priceFilter.lte = new Prisma.Decimal(String(maxPrice));
      }

      // If hasOffer filter is explicitly given, respect it
      if (hasOffer !== undefined) {
        const offerBool = String(hasOffer).toLowerCase() === "true";

        if (offerBool) {
          where.discountedPrice = {
            ...(where.discountedPrice &&
            typeof where.discountedPrice === "object" &&
            !Array.isArray(where.discountedPrice)
              ? where.discountedPrice
              : {}),
            ...priceFilter,
          };
        } else {
          where.originalPrice = priceFilter;
        }
      } else {
        // Effective price logic:
        // discountedPrice if exists, otherwise originalPrice
        where.OR = [
          {
            discountedPrice: {
              not: null,
              ...priceFilter,
            },
          },
          {
            discountedPrice: null,
            originalPrice: priceFilter,
          },
        ];
      }
    }

    // Filter by start date range
    if (startDate || endDate) {
      where.startDate = {};

      if (startDate) {
        where.startDate.gte = new Date(String(startDate));
      }

      if (endDate) {
        where.startDate.lte = new Date(String(endDate));
      }
    }

    // Pagination
    const pageNumber = Number(page) > 0 ? Number(page) : 1;
    const limitNumber = Number(limit) > 0 ? Number(limit) : 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Allowed sorting fields
    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "startDate",
      "endDate",
      "originalPrice",
      "discountedPrice",
      "name",
      "availableSlots",
    ];

    const finalSortBy = allowedSortFields.includes(String(sortBy))
      ? String(sortBy)
      : "createdAt";

    const finalSortOrder =
      String(sortOrder).toLowerCase() === "asc" ? "asc" : "desc";

    const [tourPackages, total] = await Promise.all([
      prisma.travelPackage.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: {
          [finalSortBy]: finalSortOrder,
        },
        include: {
          destination: {
            select: {
              id: true,
              name: true,
              shortDescription: true,
            },
          },
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),

      prisma.travelPackage.count({
        where,
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Tour packages fetched successfully",
      data: tourPackages,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (e) {
    console.error("Error Getting Tour Packages: ", e);

    return res.status(500).json({
      success: false,
      message: "Error getting tour packages",
    });
  }
};

export const viewDestinations = async (req: Request, res: Response) => {
  try {
    const {
      name,
      region,
      budgetLevel,
      languages,
      currency,
      page = "1",
      limit = "10",
      sortBy = "name",
      sortOrder = "desc",
    } = req.query;

    const where: Prisma.DestinationWhereInput = {};

    if (name) {
      where.name = {
        contains: String(name),
        mode: "insensitive",
      };
    }

    if (region) {
      where.region = {
        contains: String(region),
        mode: "insensitive",
      };
    }

    if (budgetLevel) {
      where.budgetLevel = String(budgetLevel);
    }

    if (currency) {
      where.currency = String(currency).toUpperCase();
    }

    if (languages) {
      where.languages = {
        hasSome: String(languages)
          .split(",")
          .map((lang) => lang.trim()),
      };
    }
    if (currency) {
      where.currency = String(currency);
    }

    const pageNumber = Number(page) > 0 ? Number(page) : 1;
    const limitNumber = Number(limit) > 0 ? Number(limit) : 10;
    const skip = (pageNumber - 1) * limitNumber;

    const allowedSortFields = ["name"];

    const finalSortBy = allowedSortFields.includes(String(sortBy))
      ? String(sortBy)
      : "name";
    const finalSortOrder =
      String(sortOrder).toLowerCase() === "asc" ? "asc" : "desc";

    const [destinations, total] = await Promise.all([
      prisma.destination.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: {
          [finalSortBy]: finalSortOrder,
        },
      }),
      prisma.destination.count({
        where,
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Destinations fetched successfully",
      data: destinations,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error Getting Destinations: ", error);
    res.status(500).json({
      success: false,
      message: "Error getting destinations",
    });
  }
};
export const viewCountries = async (req: Request, res: Response) => {
  try {
    const {
      continent,
      minPopulation,
      maxPopulation,
      languages,
      page = "1",
      limit = "10",
      sortBy = "commonName",
      sortOrder = "desc",
    } = req.query;

    const where: Prisma.CountryProfileWhereInput = {};

    if (continent) {
      where.continent = {
        contains: String(continent),
        mode: "insensitive",
      };
    }

    if (minPopulation || maxPopulation) {
      const populationFilter: Prisma.BigIntNullableFilter = {};

      if (minPopulation) {
        populationFilter.gte = BigInt(minPopulation as string);
      }

      if (maxPopulation) {
        populationFilter.lte = BigInt(maxPopulation as string);
      }

      where.population = populationFilter;
    }

    if (languages) {
      const languageArray = String(languages)
        .split(",")
        .map((lang) => lang.trim());

      where.languages = {
        hasSome: languageArray,
      };
    }

    const pageNumber = Number(page) > 0 ? Number(page) : 1;
    const limitNumber = Number(limit) > 0 ? Number(limit) : 10;
    const skip = (pageNumber - 1) * limitNumber;

    const allowedSortFields: Prisma.CountryProfileScalarFieldEnum[] = [
      "commonName",
      "population",
    ];

    const finalSortBy = allowedSortFields.includes(
      sortBy as Prisma.CountryProfileScalarFieldEnum,
    )
      ? (sortBy as Prisma.CountryProfileScalarFieldEnum)
      : "commonName";

    const finalSortOrder =
      String(sortOrder).toLowerCase() === "asc" ? "asc" : "desc";

    const [countries, total] = await Promise.all([
      prisma.countryProfile.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: {
          [finalSortBy]: finalSortOrder,
        },
      }),

      prisma.countryProfile.count({
        where,
      }),
    ]);

    const formattedCountries = countries.map((country) => ({
      ...country,
      population:
        country.population !== null ? Number(country.population) : null,
    }));

    return res.status(200).json({
      success: true,
      message: "Countries fetched successfully",
      data: formattedCountries,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error fetching countries:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching countries",
    });
  }
};

export const viewBookings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (e) {
    console.error("Error getting bookings:", e);

    return res.status(500).json({
      success: false,
      message: "Error getting bookings data",
    });
  }
};

export const bookTrip = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = createBookingSchema.safeParse(req.body);

    if (!parsed.success) {
      console.log(parsed.error.issues);

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        issues: parsed.error.issues,
        fieldErrors: parsed.error.flatten().fieldErrors,
        formErrors: parsed.error.flatten().formErrors,
      });
    }

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { packageId, travelerCount, travelers } = parsed.data;

    const travelPackage = await prisma.travelPackage.findUnique({
      where: {
        id: packageId,
      },
    });

    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        message: "Travel package not found",
      });
    }

    if (
      !travelPackage.availableSlots ||
      travelPackage.availableSlots < travelerCount
    ) {
      return res.status(400).json({
        success: false,
        message: "Not enough available slots",
      });
    }

    const pricePerTraveler =
      travelPackage.hasOffer && travelPackage.discountedPrice != null
        ? Number(travelPackage.discountedPrice)
        : Number(travelPackage.originalPrice);

    const totalCost = pricePerTraveler * travelerCount;

    const booking = await prisma.booking.create({
      data: {
        userId,
        packageId,

        travelerCount,
        travelers,

        totalCost,

        paymentStatus: PaymentStatus.Pending,
        bookingStatus: BookingStatus.Pending,

        bookedAt: new Date(),

        startDate: travelPackage.startDate,
        endDate: travelPackage.endDate,
      },

      include: {
        package: {
          select: {
            id: true,
            name: true,
            destination: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully. Proceed to payment.",
      data: booking,
    });
  } catch (e) {
    console.error("Error booking trip:", e);

    return res.status(500).json({
      success: false,
      message: "Error creating booking",
    });
  }
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId } = req.body;

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (!booking.totalCost) {
      return res.status(400).json({
        success: false,
        message: "Booking amount not found",
      });
    }

    if (booking.paymentStatus === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Payment already completed",
      });
    }

    const order = await razorpay.orders.create({
      amount: Number(booking.totalCost) * 100,
      currency: "INR",
      receipt: booking.id,
    });

    await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        paymentOrderId: order.id,
      },
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to create Razorpay order",
    });
  }
};

export const verifyOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const booking = await prisma.booking.findFirst({
      where: {
        paymentOrderId: razorpay_order_id,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.paymentStatus === PaymentStatus.Completed) {
      return res.status(400).json({
        success: false,
        message: "Payment already verified",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // await prisma.booking.update({
    //   where: {
    //     id: booking.id,
    //   },
    //   data: {
    //     paymentStatus: PaymentStatus.Completed,
    //     paymentId: razorpay_payment_id,
    //     paymentSignature: razorpay_signature,
    //   },
    // });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const togglePrivate = async (req: AuthRequest, res: Response) => {
  try {
    const { isPrivate } = req.body;

    if (typeof isPrivate !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isPrivate must be true or false",
      });
    }

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isPrivate,
      },
    });

    return res.status(200).json({
      success: true,
      message: `User account changed to ${isPrivate ? "Private" : "Public"}`,
    });
  } catch (e) {
    console.error("Error changing private status:", e);

    return res.status(500).json({
      success: false,
      message: "Error changing private status",
    });
  }
};

export const toggleMailnotifications = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { toggle } = req.body;

    if (typeof toggle !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Toggle must be true or false",
      });
    }

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailNotifications: toggle,
      },
    });

    return res.status(200).json({
      success: true,
      message: `Email notifications ${toggle ? "enabled" : "disabled"} successfully`,
    });
  } catch (e) {
    console.error("Error toggling email notifications:", e);
    return res.status(500).json({
      success: false,
      message: "Error toggling email notifications",
    });
  }
};
