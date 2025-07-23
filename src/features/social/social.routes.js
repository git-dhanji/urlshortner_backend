

import { Router } from "express";
import googleAuth from "./social.controllers.js";

const router = Router();

router.post("/", googleAuth);

export default router;
