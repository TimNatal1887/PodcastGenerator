const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: __dirname + "/../.env" });
const geminiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


async function geminiTest(){
    const prompt = "Explain how Basketball works";
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

}

geminiTest()

async function generateTranscriptFromAudio(){
    const result = await model.generateContent([
        {
          fileData: {
            mimeType: audioFile.file.mimeType,
            fileUri: audioFile.file.uri
          }
        },
        { text: "Generate a transcript of the speech." },
      ]);
    
    // Print the response.
    console.log(result.response.text())
}

function testCall(req){
    console.log(req)
    return `Message received: ${req}`
}
module.exports = {
    geminiTest,
    testCall
}