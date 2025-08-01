import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import GamesPage from '../pages/GamesPage';
import ConceptsPage from '../pages/Concept/ConceptsPage';
import TimeComplexityPage from '../pages/Concept/TimeComplexityPage';
import SpaceComplexityPage from '../pages/Concept/SpaceComplexityPage';
import AlgorithmDesignPage from '../pages/Concept/AlgorithmDesignPage';
import DataStructuresPage from '../pages/Concept/DataStructuresPage';
import SortingAlgorithmsPage from '../pages/Concept/SortingAlgorithmsPage';
import GraphAlgorithmsPage from '../pages/Concept/GraphAlgorithmsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/concepts" element={<ConceptsPage />} />
      <Route path="/concepts/time-complexity" element={<TimeComplexityPage />} />
      <Route path="/concepts/space-complexity" element={<SpaceComplexityPage />} />
      <Route path="/concepts/algorithm-design" element={<AlgorithmDesignPage />} />
      <Route path="/concepts/data-structures" element={<DataStructuresPage />} />
      <Route path="/concepts/sorting-algorithms" element={<SortingAlgorithmsPage />} />
      <Route path="/concepts/graph-algorithms" element={<GraphAlgorithmsPage />} />
    </Routes>
  );
};

export default AppRoutes;