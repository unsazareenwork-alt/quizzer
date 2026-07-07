require("dotenv").config({
  path: require("path").join(__dirname, "../.env"),
});

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function test() {
  try {
    const models = await groq.models.list();
    console.log("SUCCESS!");
    console.log(models.data.map(m => m.id));
  } catch (err) {
    console.error(err.status);
    console.error(err.error);
  }
}

test();