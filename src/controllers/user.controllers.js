import { getUserUrl } from "../dao/shorturl.dao.js";
import { WrapAsync } from "../utils/errorHandler.utils.js";

export const userAllUrls = WrapAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new Error("User not available");
  }
  const urls = await getUserUrl(user._id);
  res.status(200).json({
    message: "all urls found",
    urls: urls,
  });
});