import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import { api } from '../../../constants';
import './AdminMovieForm.scss';

const MovieForm = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [poster, setPoster] = useState('');
  const [rows, setRows] = useState();
  const [seatsPerRow, setSeatsPerRow] = useState();

  useEffect(() => {
    axios.get(`${api}/rooms/${roomId}`)
      .then(response => setRoom(response.data))
      .catch(error => console.error(error));
  }, [roomId]);

  const handleAddMovie = (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      time,
      poster,
      seats: generateSeats(rows, seatsPerRow)
    };
    axios.post(`${api}/admin/rooms/${roomId}/movies`, newMovie)
      .then(response => setRoom(response.data))
      .catch(error => console.error(error));
  };

  const handleDeleteMovie = (movieId) => {
    axios.delete(`${api}/admin/rooms/${roomId}/movies/${movieId}`)
      .then(response => setRoom(response.data))
      .catch(error => console.error(error));
  };

  const generateSeats = (rows, seatsPerRow) => {
    const seats = [];
    for (let row = 0; row < rows; row++) {
      for (let seat = 0; seat < seatsPerRow; seat++) {
        seats.push({ row, seat, available: true });
      }
    }
    return seats;
  };

  if (!room) return <Spinner />;

  return (
    <div className="admin-room-detail-container">
      <h2 className="room-name">Room: {room.name}</h2>
      <form onSubmit={handleAddMovie} className="add-movie-form">
        <h3>Add Movie</h3>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Poster URL:</label>
          <input
            type="text"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rows:</label>
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Seats per Row:</label>
          <input
            type="number"
            value={seatsPerRow}
            onChange={(e) => setSeatsPerRow(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        <button type="submit" className="btn-add-movie">Add Movie</button>
      </form>

      <h3>Movies</h3>
      <ul className="movie-list">
        {room.movies.map((movie) => (
          <li key={movie._id} className="movie-item">
            <h4>{movie.title} - {movie.time}</h4>
            <button onClick={() => handleDeleteMovie(movie._id)} className="btn-delete-movie">Delete Movie</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieForm;
