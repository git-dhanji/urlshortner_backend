
import { configDotenv } from "dotenv";
configDotenv(); // Load environment variables FIRST before any other imports

import express from "express";
import session from "express-session";
import connectToDB from "./src/config/mongo.config.js";
import shorturlRouter from "./src/routes/shorturl.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import { globalErrorHandler } from "./src/utils/errorHandler.utils.js";
import { redirectFromShortUrl } from "./src/controllers/shorturl.controllers.js";
import userUrls from "./src/routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import trackClick from "./src/controllers/analytics.controllers.js";
import analyticsRouter from "./src/routes/analytics.routes.js";
import contactRouter from "./src/routes/contact.routes.js";
import socialRoutes from './src/features/social/socialRoutes.js'
import passport from "passport";
import trackData from './src/routes/trackData.routes.js'
import apiCreateUrlRoutes from './src/features/api/api.routes.js'
import paymentRoutes from './src/features/payment/payment.routes.js'
import insertPrice from "./src/features/payment/pricing.js";
import TestRoute from './src/test/test.routes.js'
const port = process.env.PORT || 4000;
const app = express();
// Setup session first
app.use(
  session({
    secret: process.env.GOOGLE_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true if using https
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

(async () => {
  try {
    await import('./src/config/password.js');
  } catch (error) {
    console.log(error)
  }
})();


app.use(
  cors({
    origin: "http://localhost:5173" || process.env.CLIENT_URI, // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Get

app.get("/", async (req, res) => {
  res.json({

    message: "Welcome to URL Shortner API"
  })
});

app.use('/testapi', TestRoute)


//developer api 
app.use('/api/v1', apiCreateUrlRoutes)

//Social login 
app.use('/auth', socialRoutes)

//Payment route 
app.use('/api/payment', paymentRoutes)
//create url
app.use("/api/create", shorturlRouter)
app.use("/api/urls", userUrls);
app.use("/api/auth", authRouter);
app.use("/api", analyticsRouter);
app.use("/api/contact", contactRouter);


// app.use("/:id",  redirectFromShortUrl);
app.use('/api', trackData)
app.use("/:id", trackClick, redirectFromShortUrl);




app.use(globalErrorHandler);

app.listen(port, () => {
  connectToDB();
  insertPrice();
  // pricingController('hello');
  console.log(`server is running port http://localhost:${port}`);
});





