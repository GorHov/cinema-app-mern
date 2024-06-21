import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/admin/rooms">Admin</Link>
        <Link to="/">Rooms</Link>
      </nav>
    </header>
  );
};

export default Header;
