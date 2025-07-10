import {
  createShortUrlService,
  getUrlByShortIdService,
} from "../services/shorturl.services.js";
import { AppError } from "../utils/errorHandler.utils.js";

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    throw new AppError("URL is required", 400);
  }
  const shortUrl = await createShortUrlService(url);

  res.send(process.env.APP_URI + shortUrl).json({
    message: "short url created successfully",
  });
};

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getUrlByShortIdService(id);
  //add validate url for redirect and check malicious or not 
  if (url) {
    res.redirect(url);
  } else {
    throw new AppError("URL not found", 404);
  }
};
