import shortUrlSchema from "../models/shorturl.models.js";

export const saveShortUrl = async (shortUrl, originalUrl, userId) => {
  const newUrl = new shortUrlSchema({
    short_url: shortUrl,
    original_url: originalUrl,
    redirect_url: `${process.env.APP_URI}${shortUrl}`,
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


