const db = require("../config/db");

const createBooking = async (req, res) => {
  const { homestayId, start_date, end_date } = req.body;
  const { id: userId } = req.user;

  if (!homestayId || !start_date || !end_date) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  // Validate date range
  if (new Date(start_date) >= new Date(end_date)) {
    return res.status(400).json({
      success: false,
      message: "Invalid date range"
    });
  }

  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS conflict_count
      FROM homestay_booking hb
      WHERE hb.homestay_id = ?
        AND hb.status IN ('PENDING', 'CONFIRMED')
        AND ? < hb.end_date
        AND ? > hb.start_date;
      `,
      [homestayId, start_date, end_date]
    );

    if (rows[0].conflict_count > 0) {
      return res.status(400).json({
        success: false,
        message: "Homestay is already booked for selected dates."
      });
    }

    const [result] = await db.query(
      `INSERT INTO homestay_booking 
       (user_id, homestay_id, start_date, end_date) 
       VALUES (?, ?, ?, ?)`,
      [userId, homestayId, start_date, end_date]
    );

    return res.status(201).json({
      success: true,
      message: "Homestay booked successfully.",
      booking_id: result.insertId
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getBookings = async (req, res) => {
  const { id: userId } = req.user;
  const { status } = req.query;

  try {
    let query = `
      SELECT
        hb.id AS booking_id,
        h.id, 
        h.title, 
        h.location, 
        h.category,
        JSON_EXTRACT(h.images, '$[0]') AS image,
        hb.status, 
        hb.start_date, 
        hb.end_date
      FROM homestays h
      INNER JOIN homestay_booking hb ON h.id = hb.homestay_id
      WHERE hb.user_id = ?
    `;

    const params = [userId];

    if (status && status !== "ALL") {
      query += ` AND hb.status = ?`;
      params.push(status);
    }

    query += ` ORDER BY hb.start_date ASC`;

    const [result] = await db.query(query, params);

    return res.status(200).json({
      success: true,
      message: result.length
        ? "Bookings fetched successfully."
        : "No bookings found.",
      bookings: result,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  if (!bookingId) {
    return res.status(400).json({
      success: false,
      message: "Booking id is required"
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE homestay_booking
      SET status = 'CANCELED'
      WHERE id = ?
      `,
      [bookingId]
    );

    if (result.affectedRows === 1) {
      return res.status(200).json({
        success: true,
        message: "Booking canceled successfully."
      });
    }

    res.status(404).json({
      success: false,
      message: "Booking not found."
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }

}

module.exports = { createBooking, getBookings, cancelBooking };
