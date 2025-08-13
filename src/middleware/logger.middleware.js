import winston from 'winston'


// Winston Logger configuration
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/combined.log" }),
        new winston.transports.File({ filename: "logs/error.log", level: "error" })
    ],
});


export const requestLogger = (req, res, next) => {
    try {
        const method = req.method || "UNKNOWN";
        const url = req.url || "UNKNOWN";
        const headers = req.headers || {};
        const cookies = maskCookies(req.cookies);
        const query = req.query || {};
        const body = req.body || {};

        logger.info("Incoming Request", {
            timestamp: new Date().toISOString(),
            method,
            url,
            headers: {
                origin: headers.origin,
                host: headers.host,
                "user-agent": headers["user-agent"],
            },
            query,
            body,
            cookies
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

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;

        logger.info("JWT Verified", { userId: user.id, email: user.email });
        next();
    } catch (err) {
        logger.error("JWT verification failed", { error: err.message });
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export default logger;


