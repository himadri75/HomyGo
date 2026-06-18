const express = require("express");
const { getFeeds, getFeedByLocation, getFeedById } = require("../controllers/FeedController");

const router = express.Router();

// GET /feed?lastId=10&size=5
router.get("/", getFeeds);

router.get("/place", getFeedByLocation);
router.get("/:feedId", getFeedById);

module.exports = router;