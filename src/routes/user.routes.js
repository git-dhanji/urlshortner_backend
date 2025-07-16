

import { Router } from "express";
import { catchAsync } from "../utils/errorHandler.utils.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userAllUrls } from "../controllers/user.controllers.js";

const router = Router();

router.get("/allUrls", authMiddleware, catchAsync(userAllUrls));
// router.get("/allUrls", async(req,res)=>{
//     res.send('ok')
// });

export default router;
