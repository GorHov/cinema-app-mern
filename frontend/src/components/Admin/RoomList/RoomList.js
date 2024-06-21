import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RoomList.scss';
import { api } from '../../../constants';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`${api}/rooms`)
      .then(response => setRooms(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteRoom = (roomId) => {
    axios.delete(`${api}/admin/rooms/${roomId}`)
      .then(() => setRooms(rooms.filter(room => room._id !== roomId)))
      .catch(error => console.error(error));
  };

  return (
    <div className="room-list-container">
      <h2>Rooms</h2>
      <Link className="add-room-link" to="/admin/rooms/new">Add New Room</Link>
      <ul className="room-list">
        {rooms.map(room => (
          <li className="room-item" key={room._id}>
            <span className="room-name">{room.name}</span>
            <div className="button-group">
              <Link className="edit-link" to={`/admin/rooms/${room._id}`}>Edit Room</Link>
              <Link className="add-movie-link" to={`/admin/rooms/${room._id}/movies/new`}>Update Movies</Link>
              <button className="delete-button" onClick={() => deleteRoom(room._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
