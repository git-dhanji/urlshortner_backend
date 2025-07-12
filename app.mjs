import express from "express";
import { configDotenv } from "dotenv";
import connectToDB from "./src/config/mongo.config.js";
import shorturlRouter from "./src/routes/shorturl.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import { globalErrorHandler } from "./src/utils/errorHandler.utils.js";
import { redirectFromShortUrl } from "./src/controllers/shorturl.controllers.js";
import cors from "cors";
import cookieParser from "cookie-parser";

configDotenv();
const port = process.env.PORT || 4000;

const app = express();

app.use(cors());

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
