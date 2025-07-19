import Analytics from "../models/analytics.models.js";
import { WrapAsync } from "../utils/errorHandler.utils.js";
import ShortUrl from "../models/shorturl.models.js";


export const getAnalyticsDataByShortId = WrapAsync(async (req, res) => {
    try {

        const { shortId } = req.params;
        if (!shortId) {
            return res.status(400).json({ message: "Short URL not found" });
        }

        // 1. Fetch basic short URL data
        const urlData = await ShortUrl.findOne({ short_url: shortId });
        if (!urlData) {
            return res.status(404).json({ message: "Short URL not found" });
        }
        const analytics = await Analytics.aggregate([
            { $match: { shortUrl: shortId } },
            {
                $facet: {
                    totalClicks: [{ $count: "count" }],
                    clicksOverTime: [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$clickedAt" } },
                                clicks: { $sum: 1 }
                            }
                        },
                        { $sort: { _id: 1 } }
                    ],
                    deviceTypes: [
                        {
                            $group: {
                                _id: "$deviceInfo.deviceType",
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    browsers: [
                        {
                            $group: {
                                _id: "$deviceInfo.browser",
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    countries: [
                        {
                            $group: {
                                _id: "$location.country",
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    referrers: [
                        {
                            $group: {
                                _id: "$referrer",
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    hourlyData: [
                        {
                            $group: {
                                _id: { $hour: "$clickedAt" },
                                clicks: { $sum: 1 }
                            }
                        },
                        { $sort: { _id: 1 } }
                    ]
                }
            }
        ]);
        const result = analytics[0];
        // 3. Build response
        const response = {
            url: {
                shortUrl: `https://quicklink.com/${shortId}`,
                originalUrl: urlData.original_url,
                totalClicks: result.totalClicks[0]?.count || 0,
                createdAt: urlData.createdAt
                    ? urlData.createdAt.toISOString().split("T")[0]
                    : "Unknown",
            },
            clicksOverTime: result.clicksOverTime.map(item => ({
                date: item._id,
                clicks: item.clicks
            })),
            deviceTypes: result.deviceTypes.map(item => ({
                name: capitalize(item._id || "Unknown"),
                value: item.count,
                color: getDeviceColor(item._id)
            })),
            browsers: result.browsers.map(item => ({
                name: item._id || "Unknown",
                clicks: item.count
            })),
            countries: result.countries.map(item => ({
                name: item._id || "Unknown",
                clicks: item.count,
                flag: getCountryFlag(item._id)
            })),
            referrers: result.referrers.map(item => ({
                name: item._id || "Direct",
                clicks: item.count
            })),
            hourlyData: Array.from({ length: 24 }, (_, hour) => {
                const match = result.hourlyData.find(h => h._id === hour);
                return {
                    hour: hour.toString().padStart(2, "0"),
                    clicks: match ? match.clicks : 0
                };
            }),
        };

        res.status(200).json(response);



    } catch (error) {
        console.log('error in getAnalyticsData function in analyticsDatasenderController.js');
        console.error(error);
        res.status(500).json({
            message: "something went wrong",
        });
    }
});








// Helper functions
function capitalize(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
}

function getDeviceColor(type) {
    const colors = {
        Desktop: "#6366F1",
        Mobile: "#10B981",
        Tablet: "#F59E0B",
        Bot: "#EF4444",
        Unknown: "#9CA3AF"
    };
    return colors[capitalize(type)] || "#9CA3AF";
}

function getCountryFlag(country) {
    const flags = {
        "United States": "🇺🇸",
        "United Kingdom": "🇬🇧",
        Canada: "🇨🇦",
        Germany: "🇩🇪",
        France: "🇫🇷",
        India: "🇮🇳",
    };
    return flags[country] || "🏳️";
}