
import { Router } from "express";
import { getAnalyticsDataByShortId } from "../controllers/analyticsDatasenderController.js";

const route = Router();

route.get("/analytics/:shortId", getAnalyticsDataByShortId);

export default route;
