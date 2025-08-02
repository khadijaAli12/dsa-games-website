import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div
          className="nav-logo"
          role="button"
          tabIndex="0"
          onClick={() => navigate('/')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
        >
          <span className="logo-icon">⚡</span>
          <span className="logo-text">DSAGames</span>
        </div>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/concepts" className={({ isActive }) => (isActive ? 'active' : '')}>Concepts</NavLink>
          <NavLink to="/games" className={({ isActive }) => (isActive ? 'active' : '')}>Games</NavLink>
          <NavLink to="/practice" className={({ isActive }) => (isActive ? 'active' : '')}>Practice</NavLink>
          <NavLink to="/playground" className="nav-cta">Start Playing</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
