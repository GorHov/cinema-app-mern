import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const MovieList = () => {
  const { roomId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${api}/rooms/${roomId}`)
      .then(response => setMovies(response.data.movies))
      .catch(error => console.error(error));
  }, [roomId]);

  const deleteMovie = (movieId) => {
    axios.delete(`${api}/admin/rooms/${roomId}/movies/${movieId}`)
      .then(() => setMovies(movies.filter(movie => movie._id !== movieId)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Movies in {roomId}</h2>
      <Link to={`/admin/rooms/${roomId}/movies/new`}>Add New Movie</Link>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            {movie.title} - {movie.time}
            <Link to={`/admin/rooms/${roomId}/movies/${movie._id}`}>Edit</Link>
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
