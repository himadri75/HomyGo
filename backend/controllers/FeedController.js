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

module.exports = { getFeeds };