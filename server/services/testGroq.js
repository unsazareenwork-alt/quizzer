require("dotenv").config();

const { generateQuiz } = require("./groqService");

async function test() {
  const text = `
JavaScript is a programming language used to build interactive websites.
React is a JavaScript library for building user interfaces.
  `;

  const result = await generateQuiz(text);

  console.log(result);
}

test();