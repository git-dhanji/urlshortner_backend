
import { Router } from "express";
import { getAnalyticsDataByShortId } from "../controllers/analyticsDatasenderController.js";

const route = Router();

route.get("/:shortId", getAnalyticsDataByShortId);

export default route;
