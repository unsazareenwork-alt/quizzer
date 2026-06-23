const fs = require("fs");
const { generateQuiz } = require("../services/groqService");

const uploadTxt = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const filePath = req.file.path;

    const textContent = fs.readFileSync(filePath, "utf8");

    const questions = await generateQuiz(textContent);

    res.status(200).json({
      message: "Quiz generated successfully",
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error generating quiz",
    });
  }
};

module.exports = { uploadTxt };