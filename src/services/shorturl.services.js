import { generateNanoId } from "../utils/helper.utils.js";
import { saveShortUrl } from "../dao/shorturl.dao.js";
import shortUrlSchema from "../models/shorturl.models.js";

export const createShortUrlService = async (url) => {
  const shortId = generateNanoId(6);
  await saveShortUrl(shortId, url);
  return shortId;
};

export const createShortUrlWithUserService = async (url, userId) => {
  const shortId = generateNanoId(6);
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
