const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate-quiz', async (req, res) => {
    try {
        const { title } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Create a 5-question multiple choice quiz about: ${title}. 
        Return ONLY valid JSON in this format: [{"question": "...", "options": ["A)...", "B)...", "C)...", "D)..."], "answer": "A)..."}]`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json/g, '').replace(/```/g, '');
        
        res.json({ success: true, questions: JSON.parse(text) });
    } catch (error) {
        console.error("GENERATION ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(3000, () => console.log(' Server running on port 3000'));