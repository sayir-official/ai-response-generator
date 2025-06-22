const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Log to confirm .env is loaded
console.log("🧪 DEBUG - Loaded API KEY:", process.env.OPENROUTER_API_KEY);

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/api/generate", async (req, res) => {
  const { message, tone, language } = req.body;

  if (!message || !tone || !language) {
    return res.status(400).send({ error: "Missing message/tone/language." });
  }

 const prompt = `You are texting back a reply to someone. Only respond to what they said — not the story around it.This is what they said to you:
                "${message}" Reply in a ${tone} tone like a real person would text back — direct, and realistic.
                Do NOT narrate. Do NOT describe tone. Do NOT explain.Only give the reply you would text back. Nothing else.
                Translate the reply into ${language} if needed.`;




  // DEBUG logs
  console.log("🧾 Prompt being sent:", prompt);
  console.log("📡 Headers being sent:", {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "AI ToneGen",
  });

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI ToneGen",
        },
      }
    );

    res.send({ output: response.data.choices[0].message.content });
  } catch (error) {
    console.error("❌ OpenRouter Error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }

    res.status(500).send({ error: "Router API failed. Check logs." });
  }
});

app.listen(5000, () => {
  console.log("🔥 OpenRouter API running at http://localhost:5000");
});
