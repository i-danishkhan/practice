const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL_local = process.env.DB_URL_LOCAL;
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB dk');
});

module.exports = db;