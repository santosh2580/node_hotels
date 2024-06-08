const mongoose = require('mongoose');

// Define the MongoDB connection URL
const url = 'mongodb://localhost:27017/hotels';

// Connect to the database
mongoose.connect(url, {
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

//export the database
module.exports = db;
