import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from 'crypto'
const userSchema = new mongoose.Schema(
  {
    displayName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
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
    googleId: { type: String },
    githubId: { type: String },
    facebookId: { type: String },

    loginType: {
      type: String,
      enum: ["local", "google", "github", "facebook"],
      default: "local",
    },
    isSubscribe: { type: Boolean, default: false },
    subscriptionStart: { type: Date },
    plan: {
      type: String,
      enum: ["free", "premium", 'enterprise'],
    },
    subscriptionEnd: {
      type: Date
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.loginType !== "local") return next();
  if (!this.isModified("password")) next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
