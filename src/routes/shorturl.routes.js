import { Router } from "express";
import { createShortUrl, deleteUrl } from "../controllers/shorturl.controllers.js";
import { urlMiddleware } from "../middleware/url.middleware.js";

const router = Router();

router.post("/", urlMiddleware, createShortUrl);
router.delete("/:id", deleteUrl);
export default router;
