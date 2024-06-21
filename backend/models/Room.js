const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  row: Number,
  seat: Number,
  available: {
    type: Boolean,
    default: true
  }
});

const movieSchema = new mongoose.Schema({
  title: String,
  time: String,
  poster: String,
  seats: [seatSchema]
});

const roomSchema = new mongoose.Schema({
  name: String,
  movies: [movieSchema]
});

module.exports = mongoose.model('Room', roomSchema);
