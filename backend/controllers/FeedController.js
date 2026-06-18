const db = require("../config/db");


const getFeeds = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;

  const offset = (page - 1) * size;

  try {
    const [result] = await db.query("SELECT * FROM cultural_feed ORDER BY id LIMIT ? OFFSET ?", [size, offset]);

    res.status(200).json({
      success: true,
      message: "Feeds fetched successfully.",
      offset: offset,
      page: page,
      feeds: result
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getFeedByLocation = async (req, res) => {
  const { city, district, state, country } = req.query;

  try {
    let feeds = [];
    let matchedLevel = null;

    // 1. City
    if (city) {
      const [result] = await db.query(
        `SELECT * 
         FROM cultural_feed 
         WHERE city = ?
         ORDER BY id DESC`,
        [city]
      );

      if (result.length > 0) {
        feeds = result;
        matchedLevel = "city";
      }
    }

    // 2. District
    if (feeds.length === 0 && district) {
      const [result] = await db.query(
        `SELECT * 
         FROM cultural_feed 
         WHERE district = ?
         ORDER BY id DESC`,
        [district]
      );

      if (result.length > 0) {
        feeds = result;
        matchedLevel = "district";
      }
    }

    // 3. State
    if (feeds.length === 0 && state) {
      const [result] = await db.query(
        `SELECT * 
         FROM cultural_feed 
         WHERE state = ?
         ORDER BY id DESC`,
        [state]
      );

      if (result.length > 0) {
        feeds = result;
        matchedLevel = "state";
      }
    }

    // 4. Country
    if (feeds.length === 0 && country) {
      const [result] = await db.query(
        `SELECT * 
         FROM cultural_feed 
         WHERE country = ?
         ORDER BY id DESC`,
        [country]
      );

      if (result.length > 0) {
        feeds = result;
        matchedLevel = "country";
      }
    }

    return res.status(200).json({
      success: true,
      message: "Feeds fetched successfully",
      matchedLevel,
      feeds,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getFeedById = async (req, res) => {
  const { feedId } = req.params;

  try {
    const [result] = await db.query(
      `SELECT * 
       FROM cultural_feed 
       WHERE id = ?`,
      [feedId]
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Feed not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feed fetched successfully",
      feed: result[0],
    });
  } catch (error) {
    console.error("Error fetching feed:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getFeeds, getFeedByLocation, getFeedById };