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
      return next();
    }

    const user = await findUserById(decoded.id);
    if (!user) throw new Error("user not find");
    req.user = user;
    console.log(req.user,'from url middleware')
    next();
  } catch (error) {
    console.log('create your link as guest');
    next(); // Continue as guest user
  }
};
