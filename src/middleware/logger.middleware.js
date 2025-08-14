import winston from 'winston'
import { verifyToken } from '../utils/helper.utils.js';


const maskCookies = (cookies) => {
    if (!cookies) return {};
    return Object.fromEntries(
        Object.entries(cookies).map(([k, v]) => [k, "*".repeat(v.length)])
    );
};

// Winston Logger configuration
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console()],
});


export const requestLogger = (req, res, next) => {
    try {
        const method = req.method || "UNKNOWN";
        const url = req.url || "UNKNOWN";
        const headers = req.headers || {};
        const cookies = maskCookies(req.cookies);
        const query = req.query || {};
        const body = req.body || {};

        logger.info({
            timestamp: new Date().toISOString(),
            event: "incoming_request",
            request: {
                method: method || "UNKNOWN",
                url: url || "UNKNOWN",
                headers: {
                    origin: headers.origin || null,
                    host: headers.host || null,
                    userAgent: headers["user-agent"] || null
                },
                query: query || {},
                body: body || {},
                cookies: cookies || {}
            }
        });

        next();
    } catch (err) {
        logger.error("Request Logger Error", { error: err.message });
        next();
    }
};


export const jwtLogger = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            logger.warn("No token found in cookies", { url: req.url });
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = verifyToken(token);
        req.user = user;

        logger.info("JWT Verified", { userId: user._id, user });
        next();
    } catch (err) {
        logger.error("JWT verification failed", { error: err.message });
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export default logger;


