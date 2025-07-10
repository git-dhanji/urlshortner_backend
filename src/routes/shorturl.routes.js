import { Router } from "express";
import { createShortUrl } from "../controllers/shorturl.controllers.js";
import { catchAsync } from "../utils/errorHandler.utils.js";

const router = Router();

router.post("/", catchAsync(createShortUrl));

export default router;
