import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: function () {
        // Use gravatar with md5 hash of email for unique image
        if (this.email) {
          const hash = crypto
            .createHash("md5")
            .update(this.email.trim().toLowerCase())
            .digest("hex");
          return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
        }
        // fallback
        return "https://www.gravatar.com/avatar/?d=mp";
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
