const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: __dirname + "/../.env" });
const geminiKey = process.env.GEMINI_API_KEY;
console.log(geminiKey);
console.log("Test")

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());
const express = require('express')
const transcript = express.Router()

transcript.get("/", async (req,res)=>{
    

})