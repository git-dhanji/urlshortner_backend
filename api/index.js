
import serverless from "serverless-http";
import app from "../src/app.mjs"; // import your existing Express app
import { app, connectToDB, insertPrice } from '../app.mjs'

connectToDB();
insertPrice();
export default serverless(app);