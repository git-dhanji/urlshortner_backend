import { Router } from "express";
import { createShortUrl } from "../controllers/shorturl.controllers.js";
import { catchAsync } from "../utils/errorHandler.utils.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, catchAsync(createShortUrl));

export default router;
