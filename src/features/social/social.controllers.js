

import { OAuth2Client } from "google-auth-library";
import SocialUser from "./social.model.js";
import { signToken } from "../../utils/helper.utils.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const googleAuth = async (req, res, next) => {
    const { accessToken } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: accessToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    

    const payload = ticket.getPayload();

    const { sub, email, name, picture } = payload;



    const user = await SocialUser.findOne({ providerId: sub, provider: "google" })
    
    if (!user) {
        user = await SocialUser.create({
            name,
            email,
            avatar: picture,
            provider: "google",
            providerId: sub,
        });
        user.save();
    }




    const appToken = signToken({ id: user._id, email: user.email }, "7d");
    
    res.cookie("accessToken", appToken, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true", // true in production (HTTPS)
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        domain: process.env.COOKIE_DOMAIN,
    });



}



export default googleAuth;