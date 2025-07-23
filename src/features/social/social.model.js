

import mongoose from "mongoose";
const socialSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    avatar: String,
    provider: { type: String, default: "google", enum: ["google", "facebook"] },
    providerId: String,
}, { timestamps: true });

const SocialUser = mongoose.model("SocialUser", socialSchema);
export default SocialUser;
