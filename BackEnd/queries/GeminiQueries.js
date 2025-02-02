const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: __dirname + "/../.env" });
const geminiKey = process.env.GEMINI_API_KEY;


async function geminiTest(){
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Explain how Basketball works";
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

}

geminiTest()

module.exports = {
    geminiTest
}