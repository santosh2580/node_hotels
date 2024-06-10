const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

if (!mongoURL) {
  console.error('Error: MONGODB_URL is not defined in environment variables');
  process.exit(1);
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

connectWithRetry();

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});

module.exports = db;
