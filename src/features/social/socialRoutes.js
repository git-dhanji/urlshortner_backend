import express from "express";
import passport from "passport";
import { signToken } from "../../utils/helper.utils.js";
import { cookieOptions } from "../../config/cookie.config.js";

const router = express.Router();

// Step 1: Redirect to Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Google callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: '/',
        session: true,
    }),
    async (req, res) => {
        //here add signToken
        const accessToken = await signToken({ id: req.user._id });
        res.cookie("accessToken", accessToken, cookieOptions);
        res.redirect(`${process.env.CLIENT_URI}/user/dashboard`);
    }
);

export default router;
