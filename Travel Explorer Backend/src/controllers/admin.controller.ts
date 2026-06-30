import type { Request, Response } from "express";
import prisma from "../config/prisma.ts";
import {
  createDestinationSchema,
  updateDestinationSchema,
} from "../validators/destination.validator.ts";
import {
  createTravelPackageSchema,
  updateTravelPackageSchema,
} from "../validators/tourPackage.validator.ts";
import { Role, PackageStatus, Status } from "@prisma/client";
import { addgalleryImageSchema } from "../validators/galleryImages.validator.ts";
import {
  sendImageApprovedEmail,
  sendImageRejectedEmail,
} from "../services/voyage-mail.service.ts";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: Role;
  };
}

//--------DESTINATION CONTROLLERS--------//
export const addDestination = async (req: Request, res: Response) => {
  try {
    const validatedDestination = createDestinationSchema.parse(req.body);

    const existing = await prisma.destination.findFirst({
      where: { name: validatedDestination.name },
    });

    if (existing) {
      res.status(400).json({
        success: false,
        message: "Destination Already Exists",
      });
      return;
    }

    const destination = await prisma.destination.create({
      data: validatedDestination,
    });

    return res.status(201).json({
      success: true,
      message: "Destination created Successfully",
      data: destination,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Failed to create destination",
    });
  }
};

export const updateDestination = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const existing = await prisma.destination.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    const data = updateDestinationSchema.parse(req.body);
    const updatedDestination = await prisma.destination.update({
      where: { id },
      data: data,
    });

    return res.status(200).json({
      success: true,
      data: updatedDestination,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Failed to update destination",
    });
  }
};

export const removeDestination = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const existing = await prisma.destination.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    const dltDestination = await prisma.destination.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Destination Removed Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Failed to Remove Destination",
    });
  }
};

//--------TOUR CONTROLLERS--------//

export const addTourPackage = async (req: AuthRequest, res: Response) => {
  try {
    const result = createTravelPackageSchema.safeParse(req.body);
    console.log(req);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten(),
      });
    }

    const validatedPackage = result.data;

    const existing = await prisma.travelPackage.findFirst({
      where: { name: validatedPackage.name },
    });

    if (existing) {
      res.status(400).json({
        success: false,
        message: "Package Already Exists",
      });
      return;
    }

    const tourPackage = await prisma.travelPackage.create({
      data: {
        ...validatedPackage,
        createdBy: req.user?.userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Tour Package created Successfully",
      data: tourPackage,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Failed to create Tour Package",
    });
  }
};

export const updateTourPackage = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const existing = await prisma.travelPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tour Package not found",
      });
    }

    const result = updateTravelPackageSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten(),
      });
    }
    if (result.data.name) {
      const duplicate = await prisma.travelPackage.findFirst({
        where: {
          name: result.data.name,
          NOT: {
            id,
          },
        },
      });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: "Package name already exists",
        });
      }
    }

    const updatedPackage = await prisma.travelPackage.update({
      where: { id },
      data: result.data,
    });

    return res.status(200).json({
      success: true,
      message: "Tour Package Updated Successfully",
      data: updatedPackage,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Failed to update Tour Package",
    });
  }
};

export const removeTourPackage = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const existing = await prisma.travelPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tour Package not found",
      });
    }

    await prisma.travelPackage.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Tour Package Removed Successfully",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Failed to Remove Tour Package",
    });
  }
};

export const applyOffer = async (req: Request, res: Response) => {
  try {
    const { id, offerValue } = req.body;

    if (!id || offerValue === undefined) {
      return res.status(400).json({
        success: false,
        message: "id and offerValue are required",
      });
    }

    const existing = await prisma.travelPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tour Package not found",
      });
    }

    if (!existing.originalPrice) {
      return res.status(400).json({
        success: false,
        message: "Package has no original price",
      });
    }

    const originalPrice = Number(existing.originalPrice);
    const discount = Number(offerValue);

    if (discount <= 0 || discount > 100) {
      return res.status(400).json({
        success: false,
        message: "Offer value must be between 1 and 100",
      });
    }

    const discountedPrice = originalPrice - (originalPrice * discount) / 100;

    const offerTour = await prisma.travelPackage.update({
      where: { id },
      data: {
        hasOffer: true,
        offerValue: discount,
        discountedPrice,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Offer Applied Successfully",
      offerTour,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: "Failed to Apply Offer",
    });
  }
};
export const removeOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const existing = await prisma.travelPackage.findUnique({
      where: { id },
    });
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tour Package not found",
      });
    }

    const removeofferTour = await prisma.travelPackage.update({
      where: { id },
      data: {
        hasOffer: false,
        offerValue: 0,
        discountedPrice: existing.originalPrice,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Offer Removed Successfully",
      removeofferTour,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Failed to Remove Offer",
    });
  }
};

interface UpdateStatusBody {
  id: string;
  status: PackageStatus;
}

export const updateTourStatus = async (
  req: Request<{}, {}, UpdateStatusBody>,
  res: Response,
) => {
  try {
    const { id, status } = req.body;

    if (!Object.values(PackageStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package status",
      });
    }

    const existing = await prisma.travelPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tour Package not found",
      });
    }

    const updatedTour = await prisma.travelPackage.update({
      where: { id },
      data: {
        status,
      },
    });

    return res.status(200).json({
      success: true,
      message: `Tour Package status changed to ${status}`,
      data: updatedTour,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update package status",
    });
  }
};

//--------USER CONTROLLERS--------//

export const promoteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (existing.role === Role.ADMIN) {
      return res.status(400).json({
        success: false,
        message: "User is already admin",
      });
    }

    const promotedUser = await prisma.user.update({
      where: { id },
      data: {
        role: Role.ADMIN,
      },
    });
    return res.status(200).json({
      success: true,
      message: "User promoted successfully",
      data: promotedUser,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const removeUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.body;

    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (existing.role === Role.SUPER_ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Cannot remove a role with higher authority",
      });
    }

    if (req.user?.role === existing.role) {
      return res.status(403).json({
        success: false,
        message: "Cannot remove a role in same authority",
      });
    }

    await prisma.user.delete({
      where: { id },
    });
    return res.status(200).json({
      success: true,
      message: "User Removed successfully",
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//--------Gallery CONTROLLERS--------//

export const addImageToDestinationGallery = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const parsed = addgalleryImageSchema.safeParse(req.body);
    // console.log(req)

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { imageUrl, caption } = parsed.data;
    const destinationId = req.params.id as string;

    const uploadedBy = req.user?.userId;
    const role = req.user?.role;

    console.log("Uploaded By: ", uploadedBy);
    console.log("Role: ", role);

    if (!uploadedBy || !role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!destinationId) {
      return res.status(400).json({
        success: false,
        message: "Destination ID is required",
      });
    }

    const destination = await prisma.destination.findUnique({
      where: { id: destinationId },
      select: {
        id: true,
        name: true,
      },
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    const isAdmin = role === Role.ADMIN || role === Role.SUPER_ADMIN;

    const galleryImage = await prisma.galleryImage.create({
      data: {
        destinationId,
        imageUrl,
        caption,
        uploadedBy,
        status: isAdmin ? Status.Approved : Status.Pending,
        reviewedBy: isAdmin ? uploadedBy : null,
        reviewedAt: isAdmin ? new Date() : null,
        createdAt: new Date(),
      },
    });

    return res.status(201).json({
      success: true,
      message: isAdmin
        ? "Image added to gallery successfully"
        : "Image uploaded successfully and is pending review by an Admin",
      data: galleryImage,
    });
  } catch (error) {
    console.error("Add Image To Gallery error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload image to gallery",
    });
  }
};
//Used in User Routes too

export const viewPendingGalleryReqs = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const pendingRequests = await prisma.galleryImage.findMany({
      where: {
        status: Status.Pending,
      },
    });

    if (pendingRequests.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Pending Request Remaining",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Requests Fetched Successfully", // Fixed typo "messsage"
      data: pendingRequests,
    });
  } catch (error) {
    console.error("Fetch Pending Image Reqs:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pending image requests",
    });
  }
};

export const managePendingGalleryReqs = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { status } = req.body as { status: Status };
    const id = String(req.params.id);

    if (!id || id === "undefined" || id === "null") {
      return res.status(400).json({
        success: false,
        message: "A valid Gallery image ID is required in route params",
      });
    }

    if (status !== Status.Approved && status !== Status.Rejected) {
      return res.status(400).json({
        success: false,
        message: "Status must be either Approved or Rejected",
      });
    }

    const galleryImage = await prisma.galleryImage.findUnique({
      where: { id },
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        destination: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!galleryImage) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    if (galleryImage.status !== Status.Pending) {
      return res.status(400).json({
        success: false,
        message: `This image has already been ${galleryImage.status?.toLowerCase()}`,
      });
    }

    const updatedImage = await prisma.galleryImage.update({
      where: { id },
      data: {
        status,
        reviewedAt: new Date(),
        reviewedBy: req.user?.userId,
      },
    });

    try {
      const recipientEmail = galleryImage.uploader?.email;
      if (!recipientEmail) {
        console.warn(
          `No uploader email found for gallery image ${galleryImage.id}`,
        );
      } else {
        if (status === Status.Approved) {
          await sendImageApprovedEmail({
            to: recipientEmail,
            userName: galleryImage.uploader?.name ?? "Traveler",
            destinationName:
              galleryImage.destination?.name ?? "this destination",
            imageUrl: galleryImage.imageUrl ?? undefined,
          });
        }

        if (status === Status.Rejected) {
          await sendImageRejectedEmail({
            to: recipientEmail,
            userName: galleryImage.uploader?.name ?? "Traveler",
            destinationName:
              galleryImage.destination?.name ?? "this destination",
          });
        }
      }
    } catch (mailError) {
      console.error("Gallery decision email failed:", mailError);
      // DB update already succeeded, so do not fail the request
    }

    return res.status(200).json({
      success: true,
      message:
        status === Status.Approved
          ? "Gallery image approved successfully"
          : "Gallery image rejected successfully",
      data: updatedImage,
    });
  } catch (error) {
    console.error("Error Managing Requests: ", error);

    return res.status(500).json({
      success: false,
      message: "Error Managing Requests",
    });
  }
};

export const removeImagefromgallery = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const galleryImage = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!galleryImage) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    await prisma.galleryImage.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Image removed from gallery",
    });
  } catch (error) {
    console.error("Error removing Image: ", error);

    return res.status(500).json({
      success: false,
      message: "Error removing Image",
    });
  }
};
