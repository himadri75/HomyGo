const express = require("express");
const { createUser,
  login,
  getUserDetails,
  addHomestayIntoWishlist,
  checkWishlist,
  removeFromWishlist,
  getWishlist,
  updateEmergencyEmailAndPhone,
  logout
} = require("../controllers/authController");
const { addUserLocation } = require("../controllers/geoLocationController");
const authMiddleware = require("../middleware/authMiddleware");

const Route = express.Router();

// **********************
// BASE URL = "/api/v1/users"
// **********************

Route.post("/register", createUser);

Route.post("/login", login);

Route.get("", authMiddleware, getUserDetails);

Route.post("/logout", logout);

Route.patch("/emergency", authMiddleware, updateEmergencyEmailAndPhone);

Route.post("/sos", authMiddleware, addUserLocation);

Route.post("/:homestayId/wishlist", authMiddleware, addHomestayIntoWishlist);

Route.get("/:homestayId/wishlist", authMiddleware, checkWishlist);

Route.delete("/:homestayId/wishlist", authMiddleware, removeFromWishlist);

Route.get("/wishlist", authMiddleware, getWishlist);

module.exports = Route;
