const express = require('express');
const router = express.Router();
const data = require('./models/roomModel');

// GET Routes for /rooms with optional filtering
router.get('/rooms', (req, res) => {
  const { type, price, name, is } = req.query;

  let filteredRooms = data
    .filter(room =>
      !type || room.type.toLowerCase() === type.toLowerCase()
    )
    .filter(room =>
      !price || room.price <= parseFloat(price)
    )
    .filter(room =>
      !name || room.name.toLowerCase().includes(name.toLowerCase())
    )
    .filter(room =>
      isAvailable === undefined || room.isAvailable === (isAvailable === 'true')
    );

  return filteredRooms.length === 0
    ? res.status(404).json({
        status: 404,
        message: 'No rooms found matching the criteria',
        data: []
      })
    : res.status(200).json({
        status: 200,
        message: 'Rooms retrieved successfully',
        data: filteredRooms
      });
});


router.post('/rooms', (req, res) => {
  const { name, price, type, isBooked } = req.body || {};

  // Validation
  if (!name || !price || !type || isBooked === undefined) {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request: Name, Price, Type, and isBooked are required'
    });
  }

  const newRoom = {
    id: data.length + 1,
    name,
    price,
    type,
    isBooked
  };

  data.push(newRoom);

  res.status(201).json({
    status: 201,
    message: 'Room created successfully',
    data: newRoom
  });
});
// PUT Routes for /rooms/:id
router.put('/rooms/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 404,
      message: `Room with ID ${id} not found`,
    });
  };

  data[index] = { id, ...req.body };

  res.status(200).json({
    status: 200,
    message: 'Room updated successfully',
    data: data[index]
  });
});
//Delete Routes for /rooms/:id
router.delete('/rooms/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 404,
      message: `Room with ID ${id} not found`,
    });
  };

  data.splice(index, 1);

  res.status(203).json({
    status: 203,
    message: 'Room deleted successfully'
  });
});

module.exports = router;