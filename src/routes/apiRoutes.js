const express = require('express');
const router = express.Router();

const {
    getAllRooms,
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom
} = require('../controllers/roomController');

router.get('/rooms', getAllRooms);
router.post('/rooms', createRoom);
router.get('/rooms/:id', getRoomById);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

module.exports = router;