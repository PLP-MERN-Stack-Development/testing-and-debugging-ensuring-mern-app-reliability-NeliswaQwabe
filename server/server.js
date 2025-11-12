const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config(); 

const bugRoutes = require('./routes/bugRoutes'); // Assuming you'll create this file
const { notFound, errorHandler } = require('./middleware/errorHandler'); 

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- 1. Standard Middleware ---
app.use(cors());
app.use(express.json()); // Body parser middleware for JSON payloads

// --- 2. Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Exit process if DB connection fails (critical failure)
    process.exit(1); 
  });

// --- 3. API Routes ---
// The bugRoutes file will contain logic for GET, POST, PUT, DELETE /api/bugs
app.use('/api/bugs', bugRoutes);

// Simple health check route
app.get('/', (req, res) => {
    res.send('Bug Tracker API Running');
});

// --- 4. Error Handling Middleware (MUST be last) ---

// Catch 404 and forward to error handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// --- 5. Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the app for Supertest integration testing
module.exports = app;