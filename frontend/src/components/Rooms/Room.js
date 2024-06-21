import React from 'react';
import { Link } from 'react-router-dom';

const Room = ({ room }) => {

return(
  <li>
    <Link to={`/rooms/${room._id}`}>{room?.name}</Link>
  </li>
)
  
}

export default Room;
