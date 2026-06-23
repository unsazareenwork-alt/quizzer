const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadTxt } = require("../controllers/uploadController");

router.post("/txt", upload.single("file"), uploadTxt);

module.exports = router;