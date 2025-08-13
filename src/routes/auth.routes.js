import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import { catchAsync } from "../utils/errorHandler.utils.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { jwtLogger } from "../middleware/logger.middleware.js";

const router = Router();

router.post("/login", catchAsync(loginUser));
router.post("/register", catchAsync(registerUser));
router.get("/me", jwtLogger, authMiddleware, async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});
router.get("/logout", logoutUser);

export default router;
