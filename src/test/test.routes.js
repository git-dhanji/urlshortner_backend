import { Router } from "express";
import testController from "./test.controllers.js";

const route = Router();

route.post("/post", testController).get("/get", async (req, res) => {
  res.json({
    message: "test get",
  });
});

export default route;
