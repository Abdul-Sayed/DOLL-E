import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();
const port = process.env.PORT || 8080;

// Create Express server
const app = express();
// Express configuration to use cors
app.use(cors());
// Express configuration to use json
app.use(express.json({ limit: "50mb" }));

// Configure the routes
app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// Start the server
(async function startServer() {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
