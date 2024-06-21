const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Create a room
router.post('/rooms', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const room = await newRoom.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update a room
router.put('/rooms/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.roomId, req.body, { new: true });
    if (room) {
      res.json(room);
    } else {
      res.status(404).send('Room not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete a room
router.delete('/rooms/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.roomId);
    if (room) {
      res.json({ message: 'Room deleted' });
    } else {
      res.status(404).send('Room not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create a movie
router.post('/rooms/:roomId/movies', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (room) {
      const newMovie = {
        title: req.body.title,
        time: req.body.time,
        poster: req.body.poster,
        seats: req.body.seats  // Assuming req.body.seats is an array of seat objects
      };
      room.movies.push(newMovie);
      await room.save();
      res.status(201).json(room);
    } else {
      res.status(404).send('Room not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update a movie
router.put('/rooms/:roomId/movies/:movieId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (room) {
      const movie = room.movies.id(req.params.movieId);
      if (movie) {
        Object.assign(movie, req.body);
        await room.save();
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

// Delete a movie
router.delete('/rooms/:roomId/movies/:movieId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (room) {
      const movie = room.movies.id(req.params.movieId);
      if (movie) {
        room.movies.pull(movie);
        await room.save();
        res.json(room);
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
