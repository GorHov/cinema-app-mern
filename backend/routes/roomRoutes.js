const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Fetch all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Fetch room by ID
router.get('/:roomId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (room) {
      res.json(room);
    } else {
      res.status(404).send('Room not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Fetch movie by ID
router.get('/:roomId/movies/:movieId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (room) {
      const movie = room.movies.id(req.params.movieId);
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send('Movie not found');
      }
    } else {
      res.status(404).send('Room not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
