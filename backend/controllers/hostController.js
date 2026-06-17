const db = require("../config/db");
const upload = require("../config/multer");
const axios = require("axios")

const addNewHomestay = async (req, res) => {
  try {
    const {
      title,
      location,
      host,
      host_email,
      host_phone,
      category,
      base_price,
      discount_price,
      terms_and_conditions,
      features,
      offers,
      foods,
      capacity,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !location ||
      !host_phone ||
      !category ||
      !base_price
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // Validate JSON strings
    let parsedFeatures;
    let parsedOffers;
    let parsedFoods;
    let parsedCapacity;

    try {
      parsedFeatures = JSON.parse(features);
      parsedOffers = JSON.parse(offers);
      parsedFoods = JSON.parse(foods);
      parsedCapacity = JSON.parse(capacity);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON data",
      });
    }

    // Upload images
    const results = await Promise.allSettled(
      req.files.map(async (file) => {
        const formData = new FormData();

        formData.append(
          "image",
          file.buffer.toString("base64")
        );

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
          formData
        );

        return response.data.data.url;
      })
    );

    const imageUrls = results
      .filter(r => r.status === "fulfilled")
      .map(r => r.value);

    const failedUploads = results.filter(
      r => r.status === "rejected"
    );

    console.log(imageUrls);
    return res.send("ok");

    const sql = `
      INSERT INTO homestays (
        title,
        location,
        host,
        host_email,
        host_phone,
        images,
        features,
        offers,
        foods,
        reviews,
        capacity,
        base_price,
        discount_price,
        rating,
        review_count,
        likes,
        shares,
        terms_and_conditions,
        category
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      title,
      location,
      host,
      host_email,
      host_phone,
      JSON.stringify(imageUrls),
      JSON.stringify(parsedFeatures),
      JSON.stringify(parsedOffers),
      JSON.stringify(parsedFoods),
      JSON.stringify([]),
      JSON.stringify(parsedCapacity),
      Number(base_price),
      Number(discount_price || 0),
      0,
      0,
      0,
      0,
      terms_and_conditions,
      category,
    ]);

    return res.status(201).json({
      success: true,
      message: "Homestay added successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add homestay",
    });
  }
};

module.exports = { addNewHomestay };
