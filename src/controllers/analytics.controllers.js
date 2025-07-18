import Analytics from "../models/analytics.models.js";
import parseUserAgent from "../services/analytics/parseUserAgent.service.js";
import { WrapAsync } from "../utils/errorHandler.utils.js";
import geoip from "geoip-lite";

const trackClick = WrapAsync(async (req, res, next) => {
    try {
        const { id } = req.params;
        const shortUrlId = id;
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        //apply for testing ip 
        const realIp = (ip === "::1" || ip === "127.0.0.1") ? "8.8.8.8" : ip;
        const userAgentStr = req.headers["user-agent"] || "Unknown";

        // GeoIP Lookup
        const geo = geoip.lookup(realIp) || {};

        // Parse device info
        const parsed = parseUserAgent(userAgentStr) || {};
        const deviceInfo = {
            deviceType: parsed.deviceType || "unknown",
            browser: parsed.browser || "unknown",
            browserVersion: parsed.browserVersion || "unknown",
            os: parsed.os || "unknown",
            osVersion: parsed.osVersion || "unknown",
            userAgent: userAgentStr || "unknown",
        };

        const fingerprint = req.body?.fingerprint || req.query.fingerprint || req.headers["x-fingerprint"] || "unknown";


        // Optional fingerprint if using fingerprint.js or something similar
        const screen = {
            width: isNaN(parseInt(req.headers["x-screen-width"])) ? -1 : parseInt(req.headers["x-screen-width"]),
            height: isNaN(parseInt(req.headers["x-screen-height"])) ? -1 : parseInt(req.headers["x-screen-height"]),
        };

        const connection = {
            effectiveType: req.headers["x-connection-type"] || "unknown",
            downlink: isNaN(parseFloat(req.headers["x-downlink"])) ? -1 : parseFloat(req.headers["x-downlink"]),
        };
        // Referrer
        const referrer = req.get("Referer") || "Direct";


        const analyticsEntry = new Analytics({
            shortUrl: shortUrlId,
            ipAddress: ip,
            location: {
                country: geo.country || "Unknown",
                city: geo.city || "Unknown",
                region: geo.region || "Unknown",
                timezone: geo.timezone || "Unknown",
                latitude: geo.ll?.[0] || "Unknown",
                longitude: geo.ll?.[1] || "Unknown",
                isp: geo.org || "Unknown",
            },
            deviceInfo,
            referrer,
            isBot: /bot|crawl|spider|slurp|robot/i.test(userAgentStr),
            fingerprint,
            language: req.headers["accept-language"]?.split(",")[0],
            screen,
            connection,
        });
        await analyticsEntry.save();

        console.log(analyticsEntry)
        next(); // continue to actual redirect

    } catch (error) {
        console.log('this is not a error this is saying analytic data not added in trackClick function in analytics.controllers.js');
        console.error("Analytics error:", error.message);
        console.error("Full error:", error);
        next();
    }

});


export default trackClick;