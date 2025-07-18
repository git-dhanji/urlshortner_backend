import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    // Reference to the shortened URL
    shortUrl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
        required: true,
    },

    // When the click happened
    clickedAt: {
        type: Date,
        default: Date.now,
    },

    // Visitor IP Address
    ipAddress: {
        type: String,
        required: true,
    },

    // Geo-location Data
    location: {
        country: String,
        city: String,
        region: String,
        timezone: String,
        latitude: Number,
        longitude: Number,
        isp: String,
    },

    // Device Info
    deviceInfo: {
        deviceType: String, // mobile, desktop, tablet, bot
        browser: String,    // Chrome, Safari, etc.
        browserVersion: String,
        os: String,         // Windows, Android, iOS
        osVersion: String,
        userAgent: String,
    },

    // Where user came from
    referrer: {
        type: String,
        default: "Direct",
    },

    // Is it a bot?
    isBot: {
        type: Boolean,
        default: false,
    },

    // User who created the link
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    // Device fingerprint (optional, for tracking fraud/multiple clicks)
    fingerprint: {
        type: String,
    },

    // Click Quality (e.g., real, suspicious, spam)
    clickQuality: {
        type: String,
        enum: ["real", "suspicious", "spam"],
        default: "real",
    },

    // Language of the user (from browser)
    language: {
        type: String,
    },

    // Screen resolution
    screen: {
        width: Number,
        height: Number,
    },

    // Network speed estimation
    connection: {
        effectiveType: String, // 4g, 3g, slow-2g
        downlink: Number, // Mbps
    },

}, {
    timestamps: true,
});


const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
