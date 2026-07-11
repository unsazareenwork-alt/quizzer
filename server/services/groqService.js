const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateQuiz(text) {
  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      temperature: 0.3,

      messages: [
        {
          role: "system",
          content:
            "You are a quiz generator. Return ONLY valid JSON. Do not use markdown. Every question MUST contain a topic field describing the subject of the question.",
        },

        {
          role: "user",
          content: `
Generate exactly 5 multiple-choice questions from the following notes.

Return ONLY ONE valid JSON array.

Each object MUST contain:

- question
- options (4 options)
- correctAnswer
- explanation
- topic

The topic should be short (1-3 words).

Example:

[
  {
    "question":"Which Article deals with Fundamental Rights?",
    "options":[
      "Article 12",
      "Article 32",
      "Article 19",
      "Article 14"
    ],
    "correctAnswer":"Article 32",
    "explanation":"Article 32 allows citizens to move the Supreme Court for enforcement of Fundamental Rights.",
    "topic":"Fundamental Rights"
  }
]

Notes:

${text}
`,
        },
      ],
    });

    const content = response.choices[0].message.content;

    console.log("\n================ RAW AI RESPONSE ================\n");
    console.log(content);
    console.log("\n===============================================\n");

    let questions;

    try {
      questions = JSON.parse(content);
    } catch (err) {
      console.log("Direct parse failed...");

      const match = content.match(/\[[\s\S]*\]/);

      if (!match) {
        throw new Error("No JSON array found in AI response.");
      }

      questions = JSON.parse(match[0]);
    }

    // Ensure every question has a topic
    questions = questions.map((q) => ({
      ...q,
      topic: q.topic || "General",
    }));

    return questions;
  } catch (err) {
    console.error("Groq Error:");
    console.error(err);

    throw err;
  }
}

module.exports = {
  generateQuiz,
};