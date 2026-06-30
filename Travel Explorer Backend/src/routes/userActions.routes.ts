import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import {
  addToFavorites,
  removeFromFavorites,
  viewTourPacks,
  viewDestinations,
  viewCountries,
  toggleMailnotifications,
  verifyOrder,
  togglePrivate,
  bookTrip,
  viewBookings,
  createOrder,
} from "../controllers/userAction.controller.ts";

const router = Router();

router.post("/add-to-favorites", authenticate, addToFavorites);
router.delete("/remove-from-favorites", authenticate, removeFromFavorites);
router.get("/view-tour-packs", viewTourPacks);
router.get("/view-destinations", viewDestinations);
router.get("/view-countries", viewCountries);
router.patch("/toggle-private", authenticate, togglePrivate);
router.patch("/toggle-mail", authenticate, toggleMailnotifications);
router.get("/view-bookings", authenticate, viewBookings);
router.post("/book-trip", authenticate, bookTrip);
router.post("/create-order", authenticate, createOrder);
router.post("/verify-order", authenticate, verifyOrder);

export default router;
