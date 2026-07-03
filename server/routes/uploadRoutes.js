const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadTxt,
} = require("../controllers/uploadController");

router.post(
  "/txt",
  authMiddleware,
  upload.single("file"),
  uploadTxt
);

module.exports = router;