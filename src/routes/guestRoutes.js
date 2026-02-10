const express = require("express");
const router = express.Router();
const Guest = require("../models/guestModel");

// CREATE guest
router.post("/", async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
