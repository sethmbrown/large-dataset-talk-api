const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// File paths
const embeddingsPath = path.join(__dirname, "vector_embeddings.json");
let embeddings = null;

fs.readFile(embeddingsPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    embeddings = JSON.parse(data);
    console.log("Embeddings loaded successfully");
  }
});

// Endpoint to serve embeddings
app.get("/api/embeddings", (req, res) => {
  if (embeddings) {
    res.json(embeddings);
  } else {
    res.status(500).send("Embeddings not loaded yet");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
