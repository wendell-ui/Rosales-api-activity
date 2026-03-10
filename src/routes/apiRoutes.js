const express = require("express");
const router = express.Router();

const roomRoutes = require("./roomRoutes");
const guestRoutes = require("./guestRoutes");
const bookingRoutes = require("./bookingRoutes");
const authRoutes = require("./authRoutes"); // add authentication routes

router.use("/rooms", roomRoutes);
router.use("/guests", guestRoutes);
router.use("/bookings", bookingRoutes);
router.use("/auth", authRoutes); // requests under /auth now handled

module.exports = router;
