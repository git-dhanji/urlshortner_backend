import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.utils.js";

export const urlMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next();
  }

  try {
    const decoded = await verifyToken(token);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await findUserById(decoded.id);
    if (!user) throw new Error("user not find");
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
