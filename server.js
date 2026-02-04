require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes/apiRoutes');

const app = express();

// 1️⃣ Connect to MongoDB
connectDB();

// 2️⃣ Middleware (DAPAT NASA ITAAS)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3️⃣ Routes
app.use(process.env.BASE_URI, apiRoutes);

// 4️⃣ Server
const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Base URI: http://localhost:${PORT}${BASE_URI}`);
});
