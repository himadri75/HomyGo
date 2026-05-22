const express = require("express");
const {
  getHomestays,
  getHomestaysByCategory,
  getSingleHomestayByCategoryAndId
} = require("../controllers/homestayController");

const router = express.Router();

// GET /homestays?limit=4
router.get("/", getHomestays);

// GET /homestays/category/mountains?limit=4
router.get("/category/:category", getHomestaysByCategory);

// GET /homestays/category/mountains/1
router.get("/category/:category/:id", getSingleHomestayByCategoryAndId);

module.exports = router;
