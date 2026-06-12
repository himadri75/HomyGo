const db = require("../config/db");

const getHomestays = async (req, res) => {
  const limit = Number(req.query.limit) || 4;

  try {
    const [mountains, snows, rivers, deserts, beaches] = await Promise.all([
      db.query("SELECT id, title, location, category, base_price AS price, rating, JSON_EXTRACT(images, '$[0]') AS image, features FROM homestays WHERE category = ? LIMIT ?", ["mountains", limit]),
      db.query("SELECT id, title, location, category, base_price AS price, rating, JSON_EXTRACT(images, '$[0]') AS image, features FROM homestays WHERE category = ? LIMIT ?", ["snows", limit]),
      db.query("SELECT id, title, location, category, base_price AS price, rating, JSON_EXTRACT(images, '$[0]') AS image, features FROM homestays WHERE category = ? LIMIT ?", ["rivers", limit]),
      db.query("SELECT id, title, location, category, base_price AS price, rating, JSON_EXTRACT(images, '$[0]') AS image, features FROM homestays WHERE category = ? LIMIT ?", ["deserts", limit]),
      db.query("SELECT id, title, location, category, base_price AS price, rating, JSON_EXTRACT(images, '$[0]') AS image, features FROM homestays WHERE category = ? LIMIT ?", ["beaches", limit])
    ]);

    res.status(200).json({
      success: true,
      message: "Homestays fetched successfully.",
      homestays: {
        mountains: mountains[0],
        snows: snows[0],
        rivers: rivers[0],
        deserts: deserts[0],
        beaches: beaches[0]
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getHomestaysByCategory = async (req, res) => {
  const { category } = req.params;
  const limit = Math.max(1, Number(req.query.limit) || 10);

  const allowedCategories = ["mountains", "snows", "rivers", "deserts", "beaches"];
  if (!allowedCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category"
    });
  }

  try {
    const [result] = await db.query(
      "SELECT id, title, location, category, base_price AS price, rating, JSON_EXTRACT(images, '$[0]') AS image, features FROM homestays WHERE category = ? LIMIT ?",
      [category, limit]
    );

    res.status(200).json({
      success: true,
      message: "Homestays fetched successfully.",
      category,
      count: result.length,
      homestays: result
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getSingleHomestayByCategoryAndId = async (req, res) => {
  const { category, id } = req.params;

  if (!category || isNaN(Number(id))) {
    return res.status(400).json({
      success: false,
      message: "Invalid category or id."
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM homestays WHERE category = ? AND id = ?",
      [category, Number(id)]
    );

    const homestay = rows[0];

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Homestay fetched successfully.",
      homestay
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const searchHomestays = async (req, res) => {
  const { q } = req.query;
  const limit = Math.min(Math.max(1, Number(req.query.limit) || 50), 100);

  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Search query must be at least 2 characters."
    });
  }

  const keyword = `%${q.trim()}%`;

  try {
    const [result] = await db.query(
      `SELECT id, title, location, category,
              base_price AS price, rating,
              JSON_EXTRACT(images, '$[0]') AS image,
              features
       FROM homestays
       WHERE location LIKE ? OR title LIKE ?
       ORDER BY rating DESC
       LIMIT ?`,
      [keyword, keyword, limit]
    );

    return res.status(200).json({
      success: true,
      message: result.length
        ? `Found ${result.length} homestay(s) matching "${q.trim()}".`
        : `No homestays found matching "${q.trim()}".`,
      query: q.trim(),
      count: result.length,
      homestays: result
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

module.exports = { getHomestays, getHomestaysByCategory, getSingleHomestayByCategoryAndId, searchHomestays };
