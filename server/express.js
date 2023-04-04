import express from "express";
import connectDB from "./mongodb/connect.js";
import * as dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();
const port = process.env.PORT || 8080;

// Create Express server
const app = express();
// Express configuration to use cors
app.use(cors());
// Express configuration to uparse incoming data to json
app.use(express.json({ limit: "50mb" }));

// Configure the api routes
app.use("/api/posts", postRoutes);
app.use("/api/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// Connect to MongoDB and Start the server
(async function startServer() {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
