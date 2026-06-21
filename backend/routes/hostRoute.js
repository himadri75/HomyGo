const express = require("express");
const multer = require("multer");
const { addNewHomestay, verifyHostDetails, sendVerificationOtp } = require("../controllers/hostController");
const { createHost, hostLogin } = require("../controllers/authController");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage()
});

router.post("/auth/register", createHost);
router.post("/auth/login", hostLogin);

router.post("/otp", sendVerificationOtp);
router.post("/verify", verifyHostDetails);

router.post("/add", upload.array("images", 5), addNewHomestay);

module.exports = router;
