import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";
import { catchAsync } from "../utils/errorHandler.utils.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/login', authMiddleware, catchAsync(loginUser));
router.post('/register', catchAsync(registerUser));

export default router;