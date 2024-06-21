import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import './MovieDetail.scss';
import { api } from '../../../constants';

const MovieDetail = () => {
  const { roomId, movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`${api}/rooms/${roomId}/movies/${movieId}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));

  }, [roomId, movieId]);

  const handleSeatClick = (row, seat) => {
    axios.post(`${api}/rooms/${roomId}/movies/${movieId}/book`, { row, seat })
      .then(response => {
        setMovie(prevMovie => {
          const updatedSeats = prevMovie.seats.map(seatObj => 
            seatObj.row === row && seatObj.seat === seat ? { ...seatObj, available: false } : seatObj
          );
          return { ...prevMovie, seats: updatedSeats };
        });
      })
      .catch(error => console.error(error));
  };

  if (!movie) return <Spinner />;

  const groupedSeats = movie.seats.reduce((acc, seatObj) => {
    if (!acc[seatObj.row]) acc[seatObj.row] = [];
    acc[seatObj.row].push(seatObj);
    return acc;
  }, {});

  return (
    <div className="movie-detail">
      <h2>{movie.title} - {movie.time}</h2>
      <img src={movie.poster} alt={movie.title} />
      <div className="seats">
        {Object.keys(groupedSeats).map(rowIndex => (
          <div className="row" key={rowIndex}>
            {groupedSeats[rowIndex].map((seatObj, seatIndex) => (
              <button
                key={seatIndex}
                onClick={() => handleSeatClick(seatObj.row, seatObj.seat)}
                disabled={!seatObj.available}
                style={{ backgroundColor: seatObj.available ? 'green' : 'red' }}
              >
                {seatObj.seat + 1}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
