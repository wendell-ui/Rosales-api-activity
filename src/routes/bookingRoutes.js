const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");

// CREATE booking
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
