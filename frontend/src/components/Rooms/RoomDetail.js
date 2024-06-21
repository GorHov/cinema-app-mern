import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { api } from '../../constants';

const RoomDetail = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);

  const getRoom = async(id) => {
    let data = await axios.get(`${api}/rooms/${id}`)
    setRoom(data.data)
  }

  useEffect(() => {
    getRoom(roomId)
  }, [roomId]);

  if (!room) return <Spinner/>;

  return (
    <div>
      <h2>{room.name}</h2>
      <ul>
        {room.movies.map(movie => (
          <li key={movie._id}>
            <Link to={`/rooms/${roomId}/movies/${movie._id}`}>
              {movie.title} - {movie.time}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomDetail;
