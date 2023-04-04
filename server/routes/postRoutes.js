import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("Hello From PostRoutes");
  })
  .post((req, res) => {
    // Handle POST request
  });

export default router;
