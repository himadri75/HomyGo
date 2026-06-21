const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { sendLoginSuccessMail, sendAccountCreatedMail } = require("../service/mailService");

const createUser = async (req, res) => {
  const { name, email, password, gender, dob } = req.body;

  if (!name || !email || !password || !gender || !dob) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, gender, dob) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, gender, dob]
    );

    sendAccountCreatedMail(name, email, gender, dob, req)
      .catch((err) => console.error("Email error:", err));

    res.status(201).json({
      success: true,
      message: "User created.",
      userId: result.insertId
    })
  } catch (error) {
    if (error.code == "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      })
    }
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    })
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  try {
    const [result] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    if (user.status === 'INACTIVE') {
      return res.status(403).json({
        success: false,
        message: "Account is inactive."
      });
    }

    // ✅ Remove password before sending
    const { password: _, ...safeUser } = user;

    sendLoginSuccessMail(safeUser, req).catch(err => console.error("Mail Error:", err));

    const token = jwt.sign({
      id: user.id,
      email: user.email
    },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: safeUser
    });

  } catch (error) {
    console.error("Login ERROR : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    if (adminId !== process.env.ADMIN_ID) {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin ID or Password."
      });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin ID or Password."
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        admin_id: process.env.ADMIN_ID,
        name: "admin",
        role: "ADMIN"
      }
    });
  } catch (error) {
    console.error("Admin Login ERROR : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }

}

const createHost = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO hosts (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, password, phone]
    );

    // sendAccountCreatedMail(name, email, gender, dob, req)
    //   .catch((err) => console.error("Email error:", err));

    res.status(201).json({
      success: true,
      message: "Host account created.",
      userId: result.insertId
    })
  } catch (error) {
    if (error.code == "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      })
    }
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    })
  }
}

const verifyHostDetails = async (req, res) => {
  
}

const hostLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  try {
    const [result] = await db.query(
      'SELECT * FROM hosts WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // ✅ Remove password before sending
    const { password: _, ...safeUser } = user;

    // sendLoginSuccessMail(safeUser, req).catch(err => console.error("Mail Error:", err));

    const token = jwt.sign({
      id: user.id,
      email: user.email
    },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: safeUser
    });

  } catch (error) {
    console.error("Login ERROR : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}

const getUserDetails = async (req, res) => {
  const { id } = req.user;

  try {
    const [result] = await db.query(
      'SELECT id, name, email, gender, dob, role, is_sos_active, emergency_email, emergency_phone, status, created_at FROM users WHERE id = ?;',
      [id]
    );

    // ✅ User not found
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    const user = result[0];

    // ✅ Format DOB
    if (user.dob) {
      user.dob = new Date(user.dob).toISOString().split("T")[0];
    }

    // ✅ Business logic check
    if (user.status === 'INACTIVE') {
      return res.status(403).json({
        success: false,
        message: "Account is inactive."
      });
    }

    // ✅ Success
    return res.status(200).json({
      success: true,
      message: "User details fetched.",
      user: user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged out",
  });
}

const updateEmergencyEmailAndPhone = async (req, res) => {
  const { id } = req.user;
  const { email, phone } = req.body;

  if (!email || !phone) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE users
        SET emergency_email = ?,
        emergency_phone = ?,
        is_sos_active = TRUE
        WHERE id = ?
      `,
      [email, phone, id]
    );

    res.status(200).json({
      success: true,
      message: "Emergency detail updated.",
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    })
  }
};

const addHomestayIntoWishlist = async (req, res) => {
  const { homestayId } = req.params;
  const { id: userId } = req.user;

  if (homestayId == null) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  try {
    const [result] = await db.query("INSERT INTO wishlist (user_id, homestay_id) VALUES (?,?)", [userId, homestayId]);

    res.status(201).json({
      success: true,
      message: "Homestay added into wishlist successfully.",
    });
  } catch (error) {
    if (error.code == "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Homestay already exists in wishlist.",
      })
    }

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    })
  }
};

const checkWishlist = async (req, res) => {
  const { homestayId } = req.params;
  const { id: userId } = req.user;

  if (!homestayId) {
    return res.status(400).json({
      message: "userId and homestayId are required"
    });
  }

  try {
    const [rows] = await db.query(
      `SELECT EXISTS (
         SELECT 1 FROM wishlist 
         WHERE user_id = ? AND homestay_id = ?
       ) AS is_present`,
      [userId, homestayId]
    );

    const isPresent = rows[0].is_present === 1;

    if (isPresent) {
      return res.status(200).json({
        present: true
      });
    } else {
      return res.status(404).json({
        present: false
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const removeFromWishlist = async (req, res) => {
  const { homestayId } = req.params;
  const { id: userId } = req.user;

  if (!homestayId) {
    return res.status(400).json({
      message: "userId and homestayId are required"
    });
  }

  try {
    const [result] = await db.query(
      "DELETE FROM wishlist WHERE user_id = ? AND homestay_id = ?",
      [userId, homestayId]
    );

    if (result.affectedRows > 0) {
      return res.status(200).json({
        success: true,
        message: "Removed from wishlist"
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Item not found in wishlist"
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }

};

const getWishlist = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const [result] = await db.query(
      `SELECT 
        h.id,
        h.title,
        h.location,
        h.category,
        h.base_price AS price,
        h.rating,
        h.images->>'$[0]' AS image,
        h.features
      FROM homestays h
      INNER JOIN wishlist w
        ON h.id = w.homestay_id
      WHERE w.user_id = ?`,
      [userId]
    );

    return res.status(200).json({
      success: true,
      message: result.length
        ? "Wishlist fetched successfully."
        : "Wishlist is empty.",
      wishlist: result
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  createUser,
  login,
  adminLogin,
  createHost,
  hostLogin,
  getUserDetails,
  logout,
  updateEmergencyEmailAndPhone,
  addHomestayIntoWishlist,
  checkWishlist,
  removeFromWishlist,
  getWishlist
};
