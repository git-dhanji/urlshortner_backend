import {
  createShortUrlService,
  createShortUrlWithUserService,
  getUrlByShortIdService,
} from "../services/shorturl.services.js";
import { AppError } from "../utils/errorHandler.utils.js";

export const createShortUrl = async (req, res) => {
  let shortUrl;

  const data = req.body;
  const user = req.user;
  console.log(data);
  if (!data) {
    throw new AppError("URL is required", 400);
  }

  if (user) {
    shortUrl = await createShortUrlWithUserService(
      data.url,
      user._id,
      data.slug
    );
  } else {
    shortUrl = await createShortUrlService(data.url);
  }
  const fullUrl = `${process.env.APP_URI + shortUrl}`;
  res.status(201).json({
    message: "short url created successfully",
    fullUrl: fullUrl,
  });
};

export const createCustomShortUrl = async (req, res) => {
  const { url, slug } = req.body;
  if (!url || !slug) {
    throw new AppError("URL and slug are required", 400);
  }
  const shortUrl = await createShortUrlService(url, slug);
  const fullUrl = `${process.env.APP_URI + shortUrl}`;

  res.status(201).send(fullUrl).json({
    message: "custom short url created successfully",
    shortUrl: fullUrl,
  });
};

export const redirectFromShortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await getUrlByShortIdService(id);

    if (url) {
      return res.redirect(url);
    } else {
      throw new AppError("URL not found", 404);
    }
  } catch (err) {
    next(err); // let your global error handler deal with it
  }
};
