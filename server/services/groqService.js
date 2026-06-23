const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateQuiz(text) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: `
You are a JSON API.

Generate exactly 5 multiple-choice questions from the text.

Return ONLY a JSON array.

Do not include explanations.
Do not include reasoning.
Do not include thinking.
Do not include markdown.
Do not include code blocks.

Format:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "...",
    "explanation": "..."
  }
]
  [
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "...",
    "explanation": "..."
  }
]
  [
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "...",
    "explanation": "..."
  }
]
  Include a short explanation for each answer.

Text:
${text}
        `,
      },
    ],
    temperature: 0.3,
  });

  const content = response.choices[0].message.content;

  console.log("RAW RESPONSE:");
  console.log(content);

  // Find JSON array in response
  const firstBracket = content.indexOf("[");
  const lastBracket = content.lastIndexOf("]");

  if (firstBracket === -1 || lastBracket === -1) {
    throw new Error("No JSON array found in AI response");
  }

  const jsonString = content.slice(
    firstBracket,
    lastBracket + 1
  );

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("JSON Parse Error:");
    console.error(jsonString);
    throw err;
  }
}

module.exports = { generateQuiz };