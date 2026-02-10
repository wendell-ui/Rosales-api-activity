const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    type: { 
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    features: [String],

//Embedded: Maintenance Log

maintenanceLog: [
    {
        date: { 
            type: Date,
            default: Date.now,
        },
        issue: {
            type: String
        },
        fixed: {
            type: Boolean,
            
        }
            
    }
]

});

module.exports = mongoose.model('Room', roomSchema);