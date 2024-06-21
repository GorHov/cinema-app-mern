import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './RoomForm.scss';
import { api } from '../../../constants';

const RoomForm = () => {
  const { roomId } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (roomId) {
      axios.get(`${api}/rooms/${roomId}`)
        .then(response => {
          setName(response.data.name);
        })
        .catch(error => console.error(error));
    }
  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const room = { name };

    if (roomId) {
      axios.put(`${api}/admin/rooms/${roomId}`, room)
        .then(() => navigate('/admin/rooms'))
        .catch(error => console.error(error));
    } else {
      axios.post(`${api}/admin/rooms`, room)
        .then(() => navigate('/admin/rooms'))
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="room-form-container">
      <h2>{roomId ? 'Edit Room' : 'Add New Room'}</h2>
      <form className="room-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Room Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">{roomId ? 'Update Room' : 'Create Room'}</button>
      </form>
    </div>
  );
};

export default RoomForm;
