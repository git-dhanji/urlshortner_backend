


import { Router } from "express";
import { contactData } from "../controllers/contact.controllers.js";
import { catchAsync } from "../utils/errorHandler.utils.js";

const router = Router();

router.post("/", catchAsync(contactData));

export default router;
