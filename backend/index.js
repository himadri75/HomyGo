require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoute");
const homestayRoute = require("./routes/homestayRoute");
const feedRoute = require("./routes/feedRoute");
const bookingRoute = require("./routes/bookingRoute");

const app = express();
const PORT = 7777;

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// CORS
const allowedOrigins = ["http://localhost:3000", "https://homygo-tan.vercel.app", "https://homygo.apps24.tech"];
app.use(
  cors({
    origin:allowedOrigins,
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    message: "Server is Running",
    port: PORT,
  });
});

// ✅ Routes
app.use("/api/v1/users", authRoute);
app.use("/api/v1/homestays", homestayRoute);
app.use("/api/v1/feeds", feedRoute);
app.use("/api/v1/bookings", bookingRoute);

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