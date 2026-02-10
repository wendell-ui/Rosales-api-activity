const express = require("express");
const router = express.Router();

const roomRoutes = require("./roomRoutes");
const guestRoutes = require("./guestRoutes");
const bookingRoutes = require("./bookingRoutes");

router.use("/rooms", roomRoutes);
router.use("/guests", guestRoutes);
router.use("/bookings", bookingRoutes);

module.exports = router;
