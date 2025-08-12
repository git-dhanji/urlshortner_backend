
import serverless from "serverless-http";
import app from "../src/app.mjs"; // import your existing Express app
import app from '../app.mjs'


import connectToDB from "../src/config/mongo.config.js";
import insertPrice from "../src/features/payment/pricing.js";


connectToDB();
insertPrice();
export default serverless(app);