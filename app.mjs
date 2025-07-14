import express from "express";
import { configDotenv } from "dotenv";
import connectToDB from "./src/config/mongo.config.js";
import shorturlRouter from "./src/routes/shorturl.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import { globalErrorHandler } from "./src/utils/errorHandler.utils.js";
import { redirectFromShortUrl } from "./src/controllers/shorturl.controllers.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./src/middleware/auth.middleware.js";

configDotenv();
const port = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Get

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the URL Shortener API" });
});



app.use("/api/create", shorturlRouter);
app.use("/api/auth", authRouter);

//Get short URL
app.use("/:id", redirectFromShortUrl);

app.use(globalErrorHandler);

app.listen(port, () => {
  connectToDB();
  console.log(`server is running port http://localhost:${port}`);
});
