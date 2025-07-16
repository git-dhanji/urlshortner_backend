import { Router } from "express";
import { createShortUrl } from "../controllers/shorturl.controllers.js";
import { catchAsync } from "../utils/errorHandler.utils.js";
import { urlMiddleware } from "../middleware/url.middleware.js";

const router = Router();

router.post("/", urlMiddleware, catchAsync(createShortUrl));

export default router;
