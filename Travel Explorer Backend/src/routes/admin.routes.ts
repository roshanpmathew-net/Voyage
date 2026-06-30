import { Router } from "express";
import { 
  addDestination, 
  updateDestination, 
  removeDestination, 
  addTourPackage, 
  updateTourPackage,
  managePendingGalleryReqs, 
  removeTourPackage, 
  applyOffer, 
  removeOffer, 
  updateTourStatus, 
  promoteUser, 
  removeUser, 
  addImageToDestinationGallery, 
  viewPendingGalleryReqs, 
  removeImagefromgallery 
} from "../controllers/admin.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { authorizeRoles } from "../middlewares/authorize.middleware.ts";
import { Role } from "@prisma/client";

const router = Router();

// Destination Routes
router.post("/add-destination", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), addDestination);
router.patch("/update-destination/:id", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), updateDestination);
router.delete("/remove-destination/:id", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), removeDestination);

// Tour Package Routes
router.post("/add-tour-package", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), addTourPackage);
router.patch("/update-tour-package/:id", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), updateTourPackage);
router.delete("/remove-tour-package/:id", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), removeTourPackage);
router.post("/apply-offer", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), applyOffer);
router.delete("/remove-offer", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), removeOffer);
router.patch("/update-tour-status", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), updateTourStatus);

// User Management Routes
router.post("/promote-user", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), promoteUser);
router.delete("/remove-user", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), removeUser);

// Gallery Routes (FIXED paths and methods)
router.post("/add-image-to-gallery/:id/gallery", authenticate, authorizeRoles(Role.USER, Role.ADMIN, Role.SUPER_ADMIN), addImageToDestinationGallery);
router.get("/view-pending-gallery-requests", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), viewPendingGalleryReqs);
router.patch("/manage-requests/:id", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), managePendingGalleryReqs);
router.delete("/remove-image/:id", authenticate, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), removeImagefromgallery);

export default router;