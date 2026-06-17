const express = require("express");
const multer = require("multer");
const { addNewHomestay } = require("../controllers/hostController");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage()
});

router.post("/add", upload.array("images", 5), addNewHomestay);

module.exports = router;
