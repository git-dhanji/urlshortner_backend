import { generateNanoId } from "../utils/helper.utils.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/shorturl.dao.js";
import shortUrlSchema from "../models/shorturl.models.js";
import genAndSaveQr from "../features/genqrcode/geneAndSaveQr.js";


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
  const qrS3Url = await genAndSaveQr(`${process.env.APP_URI}/${shortId}`, shortId);
 
  await saveShortUrl(shortId, url, userId, qrS3Url);
  return shortId;
};



export const getUrlByShortIdService = async (shortId) => {
  const url = await shortUrlSchema.findOneAndUpdate(
    { short_url: shortId },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  if (!url) {
    throw new Error("URL not found");
  }
  return url.original_url;
};
