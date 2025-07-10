import express from "express";
import { configDotenv } from "dotenv";
import connectToDB from "./src/config/mongo.config.js";
import shorturlRouter from "./src/routes/shorturl.routes.js";
import { globalErrorHandler } from "./src/utils/errorHandler.utils.js";
import { redirectFromShortUrl } from "./src/controllers/shorturl.controllers.js";

configDotenv();
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Get

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the URL Shortener API" });
});


app.use("/api/create", shorturlRouter);

//Get short URL
app.use("/:id", redirectFromShortUrl);

app.use(globalErrorHandler)

app.listen(port, () => {
  connectToDB();
  console.log(`server is running port ${port}`);
});
