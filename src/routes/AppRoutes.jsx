import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import GamesPage from '../pages/GamesPage';
import ConceptsPage from '../pages/Concept/ConceptsPage';
import TimeComplexityPage from '../pages/Concept/TimeComplexityPage';
import SpaceComplexityPage from '../pages/Concept/SpaceComplexityPage';
import AlgorithmDesignPage from '../pages/Concept/AlgorithmDesignPage';
import DataStructuresPage from '../pages/Concept/DataStructuresPage';
import SortingAlgorithmsPage from '../pages/Concept/SortingAlgorithmsPage';
import GraphAlgorithmsPage from '../pages/Concept/GraphAlgorithmsPage';
import SearchAlgorithmsPage from '../pages/Concept/SearchAlgorithmsPage';
import StringAlgorithmsPage from '../pages/Concept/StringAlgorithmsPage';
import MathematicalAlgorithmsPage from '../pages/Concept/MathematicalAlgorithmsPage';
import DSAPracticeHub from '../pages/practice';
// Games
import SortHero from '../games/SortHero/SortHero';
// Add other games as you create them
import ArrayExplorer from '../games/ArrayExplorer/ArrayExplorer';
import MazeEscape from '../games/MazeEscape/MazeEscape';
import GraphWars from '../games/GraphWars/GraphWars';
import TreeClimber from '../games/TreeClimber/TreeClimber';
import DPDungeon from '../games/DPDungeon/DPDungeon';
import StackAttack from '../games/StackAttack/StackAttack';
import QueueQuest from '../games/QueueQuest/QueueQuest';
import HeapHeroes from '../games/HeapHeroes/HeapHeroes';
import StringMaster from '../games/StringMaster/StringMaster';
import RegexRunner from '../games/RegexRunner/RegexRunner';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<GamesPage />} />
      
      {/* Concept Pages */}
      <Route path="/concepts" element={<ConceptsPage />} />
      <Route path="/concepts/time-complexity" element={<TimeComplexityPage />} />
      <Route path="/concepts/space-complexity" element={<SpaceComplexityPage />} />
      <Route path="/concepts/algorithm-design" element={<AlgorithmDesignPage />} />
      <Route path="/concepts/data-structures" element={<DataStructuresPage />} />
      <Route path="/concepts/sorting-algorithms" element={<SortingAlgorithmsPage />} />
      <Route path="/concepts/graph-algorithms" element={<GraphAlgorithmsPage />} />
      <Route path="/concepts/search-algorithms" element={<SearchAlgorithmsPage />} />
      <Route path="/concepts/string-algorithms" element={<StringAlgorithmsPage />} />
      <Route path="/concepts/mathematical-algorithms" element={<MathematicalAlgorithmsPage />} />
      
      {/* Game Routes */}
      {/* Arrays & Sorting Games */}
      <Route path="/games/sort-hero" element={<SortHero />} />
      <Route path="/games/array-explorer" element={<ArrayExplorer />} />
      
      {/* Trees & Graph Games */}
      <Route path="/games/maze-escape" element={<MazeEscape />} />
      <Route path="/games/graph-wars" element={<GraphWars />} />
      <Route path="/games/tree-climber" element={<TreeClimber />} />
      
      {/* Dynamic Programming Games */}
      <Route path="/games/dp-dungeon" element={<DPDungeon />} />
      
      {/* Data Structures Games */}
      <Route path="/games/stack-attack" element={<StackAttack />} />
      <Route path="/games/queue-quest" element={<QueueQuest />} />
      <Route path="/games/heap-heroes" element={<HeapHeroes />} />
            
      {/* String Algorithm Games */}
      <Route path="/games/string-master" element={<StringMaster />} />
      <Route path="/games/regex-runner" element={<RegexRunner />} />
      <Route path="/practice" element={<DSAPracticeHub />} />
    </Routes>
  );
};

export default AppRoutes;