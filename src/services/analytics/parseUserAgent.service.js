import useragent from "useragent";
function parseUserAgent(userAgentStr) {
    try {
        const agent = useragent.parse(userAgentStr);
        return {
            deviceType: agent.device?.family || "Unknown",
            browser: agent.family,
            browserVersion: agent.toVersion(),
            os: agent.os.family,
            osVersion: agent.os.toVersion(),
            userAgent: userAgentStr,
        };
    } catch (error) {
        console.log('error in parserUserAgent function in Service fol')
        return null;
    }
}

export default parseUserAgent;
