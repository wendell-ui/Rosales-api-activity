// src/models/roomModel.js
const rooms = [
    {
        id: 101,
        type: 'Single',
        price: 100,
        isBooked: false,
        features: ['WiFi', 'TV' ],
    },
    {
        id: 102,
        type: 'Double',
        price: 150,
        isBooked: true,
        features: ['WiFi', 'TV', 'Mini-Bar' ],
    },
    {
        id: 201,
        type: "Suite",
        price: 300,
        isBooked: false,
        features: ['WiFi', 'TV', 'Mini-Bar', 'Jacuzzi' ],
    },
    {
        id: 202,
        type: 'Single',
        price: 100,
        isBooked: false,
        features: ['WiFi' ],
    },
];
module.exports = rooms;