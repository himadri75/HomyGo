const db = require("../config/db");
const { sendEmergencySOSMail } = require("../service/mailService");

const addUserLocation = async (req, res) => {
  const { id: userId } = req.user;
  const { lat, lon, address, source } = req.body;

  try {
    
    if (!lat || !lon || !source) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const [rows, _] = await db.query(
      `SELECT name, email, emergency_email, emergency_phone, is_sos_active FROM users WHERE id = ?`, [userId]
    )

    const user = {
      name: rows[0].name,
      email: rows[0].email,
      emergency_email: rows[0].emergency_email
    };

    const [result] = await db.query(
      `INSERT INTO sos_locations
       (userId, latitude, longitude, address, source)
       VALUES (?, ?, ?, ?, ?)
      `,
      [userId, lat, lon, address || null, source]
    );

    await sendEmergencySOSMail(user.emergency_email, user, { latitude: lat, longitude: lon, address, source }, req);

    res.status(201).json({
      success: true,
      message: "Location sent to emergency email.",
      locationId: result.insertId,
    });

  } catch (error) {
    console.error("Add location error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = { addUserLocation };