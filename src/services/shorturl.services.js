import { generateNanoId } from "../utils/helper.utils.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/shorturl.dao.js";
import shortUrlSchema from "../models/shorturl.models.js";

export const createShortUrlService = async (url) => {
  const shortId = generateNanoId(6);
  await saveShortUrl(shortId, url);
  return shortId;
};

export const createShortUrlWithUserService = async (
  url,
  userId,
  slug = null
) => {
  const shortId = slug || generateNanoId(6);
  const existingUrl = await getCustomShortUrl(shortId);
  if (existingUrl) {
    throw new Error("Short URL already exists");
  }
  await saveShortUrl(shortId, url, userId);
  return shortId;
};

export const getUrlByShortIdService = async (shortId) => {
  const url = await shortUrlSchema.findOneAndUpdate(
    { short_url: shortId },
    { $inc: { clicks: 1 } }
  );
  return url.full_url;
};
