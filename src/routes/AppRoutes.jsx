import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import GamesPage from '../pages/GamesPage';
import ConceptsPage from '../pages/ConceptsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/concepts" element={<ConceptsPage/>} />
    </Routes>
  );
};

export default AppRoutes;
