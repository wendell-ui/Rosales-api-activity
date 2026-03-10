const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");

// CREATE booking
router.post("/", async (req, res) => {
  try {
    const { room, guest, checkIn, checkOut } = req.body;
    if (!room || !guest) {
      return res.status(400).json({ error: 'room and guest references are required' });
    }
    const booking = await Booking.create({ room, guest, checkIn, checkOut });
    res.status(201).json(booking);
  } catch (err) {
    const status = err.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
});

module.exports = router;
