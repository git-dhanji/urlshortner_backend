import shortUrlSchema from "../models/shorturl.models.js";

export const saveShortUrl = async (shortUrl, originalUrl, userId) => {
  const newUrl = new shortUrlSchema({
    short_url: shortUrl,
    full_url: originalUrl,
  });

  if (userId) {
    newUrl.user = userId;
  }
  await newUrl.save();
};

export const getCustomShortUrl = async (slug) => {
  return shortUrlSchema.findOne({ short_url: slug });
};


