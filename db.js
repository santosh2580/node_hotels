const mongoose = require('mongoose');
require('dotenv').config();


// Define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL;

// Connect to the database
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to open event
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

// Bind connection to error event
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Export the database connection
module.exports = db;
