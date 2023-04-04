import express from "express";
import * as dotenv from "dotenv";
import { OpenAIApi, Configuration } from "openai";

dotenv.config();
const router = express.Router();

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

router.route("/").post(async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const imgResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    const url = imgResponse.data.data[0].url;
    res.status(200).json({ url });
  } catch (error) {
    res
      .status(error?.response?.status)
      .send(
        `Error: ${error?.message || error?.response?.data?.error?.message}. ${
          error?.response?.data
        }`
      );
  }
});

export default router;
