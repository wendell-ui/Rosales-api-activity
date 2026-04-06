
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes/apiRoutes');

const app = express();
connectDB();

// parse incoming JSON and urlencoded payloads before the router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// make sure BASE_URI is computed once and used consistently
const BASE_URI = process.env.BASE_URI || '/api/v1';
app.use(BASE_URI, apiRoutes);

// catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Endpoint not found. Did you include the correct base URI?'
  });
});

// ONLY start the server if we are NOT running tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

// Export the app so Supertest can use it!
module.exports = app;