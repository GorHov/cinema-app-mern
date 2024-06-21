import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from './Rooms/Room'
import { api } from '../constants';

function Home() {
  const [rooms, setRooms] = useState([{}]);

  const getRooms = async () => {
    const rooms = await axios.get(`${api}/rooms`)
    setRooms(rooms.data)
  }

  useEffect(() => {
    getRooms()
  }, []);

  return (
    <div className="App">
      <h1>Cinema Rooms</h1>
      <ul>
        {rooms.map(room => (
          <Room key={room.id} room={room} />
        ))}
      </ul>
    </div>
  )
}

export default Home;
