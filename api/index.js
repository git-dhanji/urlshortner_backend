
import serverless from "serverless-http";
import { app, connectToDB, insertPrice } from '../app.mjs'

connectToDB();
insertPrice();
export default serverless(app);