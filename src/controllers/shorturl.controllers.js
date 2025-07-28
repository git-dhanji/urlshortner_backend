
import {
  createShortUrlService,
  createShortUrlWithUserService,
  getUrlByShortIdService,
} from "../services/shorturl.services.js";
import { AppError, WrapAsync } from "../utils/errorHandler.utils.js";
import { makeRedirectableUrl } from "../utils/helper.utils.js";
import shortUrl from '../models/shorturl.models.js'

export const createShortUrl = WrapAsync(async (req, res) => {
  let shortUrl;

  const data = req.body;
  const user = req.user;

  if (!data || !data.url) {
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

  const fullUrl = `${process.env.APP_URI}/${shortUrl}`;
  res.status(201).json({
    message: "short url created successfully!",
    fullUrl: fullUrl,
  });
});




export const createCustomShortUrl = async (req, res) => {
  const { url, slug } = req.body;
  const user = req.user;

  if (!url || !slug) {
    throw new AppError("URL and slug are required", 400);
  }

  // Use the user service if user is authenticated, otherwise create without user
  let shortUrl;
  if (user) {
    shortUrl = await createShortUrlWithUserService(url, user._id, slug);
  } else {
    // For custom URLs without user, we need a different approach
    // Since createShortUrlService doesn't accept slug, we'll use the user service with null userId
    shortUrl = await createShortUrlService(url, null, slug);
  }

  const fullUrl = `${process.env.APP_URI}/${shortUrl}`;
  res.status(201).json({
    message: "custom short url created successfully",
    shortUrl: fullUrl,
  });
};


export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await getUrlByShortIdService(id);
    const validUrl = await makeRedirectableUrl(url)
    if (validUrl) {
      return res.redirect(validUrl);
    } else {
      throw new AppError("URL not found", 404);
    }
  } catch (err) {
    next(err); // let your global error handler deal with it
  }
};



export const deleteUrl = WrapAsync(async (req, res, next) => {

  const { id } = req.params;
  const found = await shortUrl.findOneAndDelete({ short_url: id })
  console.log('found', found)
  res.json({
    message: "Url deleted successfully",
    found
  })


});