import { Router } from "express";

import { getProfile, login, signup, editProfile, refreshAccessToken} from "../controllers/user.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get('/me', authenticate, getProfile)
router.patch('/edit-profile', authenticate, editProfile )
router.patch('/generate-refresh-token', authenticate, refreshAccessToken )

export default router;
