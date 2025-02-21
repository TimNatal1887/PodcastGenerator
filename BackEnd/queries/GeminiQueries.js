require("dotenv").config({ path: __dirname + "/../.env" });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager, FileState } = require("@google/generative-ai/server")
const fs = require("fs")

const geminiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

async function geminiTest(){
    const prompt = "Explain how Basketball works";
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

}


async function getTranscriptFromAudioFile(filePath, mimeType, displayName) {
  try {
    // Upload the file to Gemini using the temporary file path
    const uploadResult = await fileManager.uploadFile(filePath, {
      mimeType: mimeType, // Use the MIME type of the uploaded file
      displayName: displayName,
    });

    // Wait for Gemini to process the file
    let file = await fileManager.getFile(uploadResult.file.name);
    while (file.state === FileState.PROCESSING) {
      await new Promise((resolve) => setTimeout(resolve, 10_000)); // Wait 10 sec
      file = await fileManager.getFile(uploadResult.file.name);
    }

    // If processing fails, throw an error
    if (file.state === FileState.FAILED) {
      throw new Error("Audio processing failed.");
    }

    // Generate transcript from the processed audio file
    const result = await model.generateContent([
      "Transcribe this audio clip.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    // Return the transcript text
    console.log("Response generated: "+ result.response.text())
  } catch (error) {
    console.error("Error processing audio file:", error);
    throw error; // Propagate the error back to the controller
  }
}
module.exports = {
    geminiTest,
    getTranscriptFromAudioFile
}