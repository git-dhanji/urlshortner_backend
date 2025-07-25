import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.models.js";

try {

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:4000/auth/google/callback",
            },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    const email = profile.emails[0].value;
                    let user = await User.findOne({ email });

                    if (!user) {
                        // ✅ Create new user
                        user = await User.create({
                            displayName: profile.displayName,
                            googleId: profile.id,
                            email,
                            avatar: profile.photos?.[0]?.value,
                            loginType: "google",
                        });


                    } else {
                        // ✅ Update if user exists but no googleId
                        if (!user.googleId) {
                            user.googleId = profile.id;
                            user.loginType = "google";
                            user.displayName = profile.displayName;
                            user.avatar = profile.photos?.[0]?.value;
                            await user.save();
                        }
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );

} catch (error) {
    console.error('Full error:', error);
}

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
