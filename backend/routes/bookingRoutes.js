const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Book a seat
router.post('/rooms/:roomId/movies/:movieId/book', async (req, res) => {
  const { row, seat } = req.body;
  try {
    const room = await Room.findById(req.params.roomId);
    if (room) {
      const movie = room.movies.id(req.params.movieId);
      if (movie) {
        const seatIndex = movie.seats.findIndex(s => s.row === row && s.seat === seat);
        if (seatIndex !== -1 && movie.seats[seatIndex].available) {
          movie.seats[seatIndex].available = false;
          await room.save();
          res.send('Seat booked');
        } else {
          res.status(400).send('Seat already booked');
        }
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
