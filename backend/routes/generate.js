import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/generate-summary", async (req, res) => {
  const { name, skills, experience } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Resume Generator"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",   // free model
        messages: [
          {
            role: "user",
            content: `Write a short professional resume summary for a person.
            Name: ${name}
            Skills: ${skills}
            Experience: ${experience}`
          }
        ]
      })
    });

    const data = await response.json();

    const summary = data.choices[0].message.content;

    res.json({ summary });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
