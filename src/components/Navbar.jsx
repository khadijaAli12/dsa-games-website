import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div
          className="nav-logo"
          role="button"
          tabIndex="0"
          onClick={() => navigate('/')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          aria-label="Navigate to home page"
        >
          <span className="logo-text">DSAGames</span>
        </div>

        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-current="page"
          >
            Home
          </NavLink>
          <NavLink 
            to="/concepts" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-current="page"
          >
            Concepts
          </NavLink>
          <NavLink 
            to="/games" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-current="page"
          >
            Games
          </NavLink>
          <NavLink 
            to="/practice" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-current="page"
          >
            Practice
          </NavLink>
          <NavLink 
            to="/playground" 
            className="nav-cta"
            aria-current="page"
          >
            Start Playing
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
