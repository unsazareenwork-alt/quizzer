const fs = require("fs");
const { generateQuiz } = require("../services/groqService");

const uploadTxt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;

    const textContent = fs.readFileSync(filePath, "utf8");

    if (!textContent.trim()) {
      return res.status(400).json({
        message: "Uploaded file is empty.",
      });
    }

    const questions = await generateQuiz(textContent);

    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  uploadTxt,
};