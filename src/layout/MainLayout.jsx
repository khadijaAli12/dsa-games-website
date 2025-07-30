import React from 'react';
import NavBar from '../components/NavBar';
import './MainLayout.scss';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <NavBar />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 DSA Games. Learn algorithms through interactive games!</p>
      </footer>
    </div>
  );
};

export default MainLayout; 