const express = require("express");
const { getFeeds } = require("../controllers/FeedController");

const router = express.Router();

// GET /feed?lastId=10&size=5
router.get("/", getFeeds);

module.exports = router;