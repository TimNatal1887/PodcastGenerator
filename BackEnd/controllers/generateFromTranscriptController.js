const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { getTranscriptFromAudioFile } = require("../queries/GeminiQueries");

const transcript = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

transcript.post("/", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    // Generate a temporary file path
    const tempFilePath = path.join(__dirname, `../uploads/${Date.now()}-${req.file.originalname}`);
    
    // Write the uploaded file buffer to the temporary file
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Call your function to process the file with Gemini
    const transcriptResponse = await getTranscriptFromAudioFile(tempFilePath, req.file.mimetype, req.file.originalname);

    // // After processing, delete the temporary file
    // fs.unlinkSync(tempFilePath);

    if (transcriptResponse) {
      res.status(200).json({ transcript: transcriptResponse });
    } else {
      res.status(500).json({ error: "Failed to process the file" });
    }
  } catch (error) {
    console.error("Error processing audio file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = transcript;