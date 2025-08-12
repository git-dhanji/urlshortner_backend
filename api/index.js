
import serverless from "serverless-http";
import { app, connectToDB, insertPrice } from '../app.mjs'


(async () => {
    try {
        await connectToDB();
        await insertPrice();
    } catch (err) {
        console.error("Error during startup:", err);
    }
})();

export default serverless(app);