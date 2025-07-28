import { createShortUrlService } from "../../services/shorturl.services.js";
import { AppError, WrapAsync } from "../../utils/errorHandler.utils.js";


const apiCreateUrl = WrapAsync(async (req, res, next) => {
    const { url } = req.body;
    if (!url) {
        throw new AppError('url is empty', 400)
    }
    const shortUrl = await createShortUrlService(url)
    if (!shortUrl) throw new Error('short url not created')

    const fullUrl = `${process.env.APP_URI}/${shortUrl}`;
    res.status(201).json({
        message: "short url created successfully!",
        data: { originalUrl: url, shortLink: fullUrl, shortId: shortUrl },
    });
})


export default apiCreateUrl