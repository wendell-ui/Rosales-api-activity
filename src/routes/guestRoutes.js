const express = require("express");
const router = express.Router();
const Guest = require("../models/guestModel");

// CREATE guest
router.post("/", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Name is required for a guest' });
    }
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (err) {
    // forward validation errors more clearly
    const status = err.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
});

module.exports = router;
