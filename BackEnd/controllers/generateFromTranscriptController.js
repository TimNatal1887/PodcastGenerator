
const express = require('express')
const transcript = express.Router()
const { testCall }= require("../queries/GeminiQueries")

transcript.get("/", async (req,res)=>{
    try {
        const testResponse = await testCall(req.body);
        if(testResponse){
            res.status(200).json({messageReceived:req.body})
        }else{
            res.status(404).json({error:"Message not received"})
        }
        
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
})

module.exports = transcript