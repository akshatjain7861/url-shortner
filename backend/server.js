const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv"); // Import dotenv

dotenv.config(); // Load .env file

const app = express();
const URL = require("../backend/models/url");
const urlRoute = require("../backend/routes/url");

app.use(express.json());
app.use(cors());

// Use environment variables for MongoDB URL and PORT
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8001;

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON PORT", PORT);
});

// Connect to MongoDB using the URL from .env
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Redirect using shortId
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry?.redirectURL);
});
