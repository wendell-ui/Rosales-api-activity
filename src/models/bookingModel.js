const mongoose = require('mongoose');
const roomModel = require('./roomModel');

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
        required: true,
    },
    checkIn: {
        type: Date,

    },
    checkOut: {
        type: Date,
    }
});

module.exports = mongoose.model("Booking", bookingSchema);