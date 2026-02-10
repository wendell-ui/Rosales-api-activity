const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require("../models/bookingModel");

// CREATE booking
router.post("/", async (req, res) => {
  try {
    // extract possible nested id fields or direct id strings
    const rawRoom = req.body.room;
    const rawGuest = req.body.guest;

    const roomId = rawRoom && (rawRoom._id || rawRoom.id || rawRoom);
    const guestId = rawGuest && (rawGuest._id || rawGuest.id || rawGuest);

    if (!roomId || !guestId) {
      return res.status(400).json({ error: 'room and guest are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(roomId) || !mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: 'room or guest id is not a valid ObjectId' });
    }

    const bookingData = {
      room: roomId,
      guest: guestId,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
    };

    const booking = await Booking.create(bookingData);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
