import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => handleNavigation('/')}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">DSAGames</span>
        </div>

        <div className="nav-links">
          <a
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => handleNavigation('/')}
          >
            Home
          </a>
          <a
            className={location.pathname === '/concepts' ? 'active' : ''}
            onClick={() => handleNavigation('/concepts')}
          >
            Concepts
          </a>
          <a
            className={location.pathname === '/games' ? 'active' : ''}
            onClick={() => handleNavigation('/games')}
          >
            Games
          </a>
          <a
            className={location.pathname === '/practice' ? 'active' : ''}
            onClick={() => handleNavigation('/practice')}
          >
            Practice
          </a>
          <a
            className="nav-cta"
            onClick={() => handleNavigation('/playground')}
          >
            Start Playing
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
