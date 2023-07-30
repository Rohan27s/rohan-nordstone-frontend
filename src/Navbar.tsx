// src/Navbar.tsx

import React from 'react';
// import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="logo">Logo</div>
      <ul className="nav-links">
        {/* <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
