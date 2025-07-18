import { WrapAsync } from "../utils/errorHandler.utils.js";
import { createUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/cookie.config.js";
import { login_user } from "../services/auth.service.js";

export const registerUser = WrapAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const { token, userData } = await createUser(username, email, password);
  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({
    message: "User created successfully",
    user: userData,
  });
});

export const loginUser = WrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await login_user(email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
});

export const logoutUser = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true, // same as you used during set
    sameSite: "Lax", // same as you used during set
  });

  return res
    .status(200)
    .json({ user: null, message: "Logged out successfully" });
};
