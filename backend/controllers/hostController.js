const db = require("../config/db");
const upload = require("../config/multer");
const axios = require("axios");
const { sendOTPVerificationMail } = require("../service/mailService");

const sendVerificationOtp = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Host ID is required",
    });
  }

  try {
    // Get host email from database
    const [hosts] = await db.query(
      "SELECT email FROM hosts WHERE id = ?",
      [id]
    );

    if (hosts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Host not found",
      });
    }

    const email = hosts[0].email;

    // Generate 6 digit OTP
    const otp = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

    // Save OTP
    const [result] = await db.query(
      "UPDATE hosts SET verification_otp = ? WHERE id = ?",
      [otp, id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP update failed",
      });
    }

    console.log("EMAIL TYPE", email, typeof email);

    // Send OTP email
    const mailSent = await sendOTPVerificationMail(
      email,
      otp
    );

    if (!mailSent) {
      return res.status(500).json({
        success: false,
        message: "OTP generated but email sending failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent successfully",
    });


  } catch (error) {
    console.error("❌ Send Verification OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const verifyHostDetails = async (req, res) => {
  const {
    id,
    type,
    aadhaar,
    pan,
    bank_name,
    account_no,
    ifsc,
    otp,
  } = req.body;


  if (
    !id ||
    !type ||
    !aadhaar ||
    !pan ||
    !bank_name ||
    !account_no ||
    !ifsc ||
    !otp
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }


  try {

    // Check stored OTP
    const [host] = await db.query(
      "SELECT verification_otp FROM hosts WHERE id = ?",
      [id]
    );

    if (host.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Host not found",
      });
    }

    const verification_otp = host[0].verification_otp;

    if (String(verification_otp) !== String(otp)) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Update host verification details
    const [updateResult] = await db.query(
      `
      UPDATE hosts
      SET 
        host_type = ?,
        aadhaar_number = ?,
        pan_card = ?,
        bank_name = ?,
        account_no = ?,
        ifsc_code = ?,
        verification_otp = NULL,
        is_verified = TRUE
      WHERE id = ?
      `,
      [
        type,
        aadhaar,
        pan,
        bank_name,
        account_no,
        ifsc,
        id
      ]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "Host details update failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Host verified successfully",
    });

  } catch (error) {

    console.error(
      "❌ Host details verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
};

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

module.exports = { sendVerificationOtp, verifyHostDetails, addNewHomestay };

