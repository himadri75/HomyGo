require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const db = require("./config/db");

const authRoute = require("./routes/authRoute");
const homestayRoute = require("./routes/homestayRoute");
const feedRoute = require("./routes/feedRoute");
const bookingRoute = require("./routes/bookingRoute");
const hostRoute = require("./routes/hostRoute");

const app = express();
const PORT = 7777;

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.set("trust proxy", 1);

// CORS
const allowedOrigins = ["http://localhost:5173", "https://homygo.apps24.tech"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/health", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");

    res.status(200).json({
      status: "UP",
      message: "Server is running",
      database: rows ? "working" : "unknown"
    });

  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({
      status: "DOWN",
      message: "Internal server error",
      database: "not working"
    });
  }
});

// ✅ Routes
app.use("/api/v1/users", authRoute);
app.use("/api/v1/homestays", homestayRoute);
app.use("/api/v1/feeds", feedRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/host", hostRoute);

app.use((req, res) => {
  res.status(404).json({
    status: "FAIL",
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.status || 500).json({
    status: "ERROR",
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

