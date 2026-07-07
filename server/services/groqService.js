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
            "You are a quiz generator. Return ONLY valid JSON. No markdown. No explanations outside JSON.",
        },

        {
          role: "user",
          content: `
Generate exactly 5 multiple-choice questions from the following notes.

Return ONLY ONE valid JSON array.

Example:

[
  {
    "question":"Question here",
    "options":[
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correctAnswer":"Option A",
    "explanation":"Short explanation."
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

    // Try direct JSON first
    try {
      return JSON.parse(content);
    } catch (err) {
      console.log("Direct parse failed...");

      // Extract first JSON array
      const match = content.match(/\[[\s\S]*\]/);

      if (!match) {
        throw new Error("No JSON array found in AI response.");
      }

      return JSON.parse(match[0]);
    }
  } catch (err) {
    console.error("Groq Error:");
    console.error(err);

    throw err;
  }
}

module.exports = {
  generateQuiz,
};