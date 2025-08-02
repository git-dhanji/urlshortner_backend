import shortUrlSchema from "../models/shorturl.models.js";
import { AppError } from "../utils/errorHandler.utils.js";

export const saveShortUrl = async (shortUrl, originalUrl, userId, qrS3Url) => {
  const newUrl = new shortUrlSchema({
    short_url: shortUrl,
    original_url: originalUrl,
    redirect_url: `${process.env.APP_URI}/${shortUrl}`,
    qrcode: qrS3Url
  });

  if (userId) {
    newUrl.user = userId;
  }

  await newUrl.save();
};

export const getCustomShortUrl = async (slug) => {
  return shortUrlSchema.findOne({ short_url: slug });
};


export const getUserUrl = async (id) => {
  return shortUrlSchema.find({ user: id });
};


export const findByShortIdAndUpdate = async (shortId, value) => {
  try {
    const data = await shortUrlSchema.findOneAndUpdate({ short_url: shortId }, {
      ...value
    })
    return data;
  } catch (error) {
    throw new AppError("FindByShortId  not found", 404);
  }
}


