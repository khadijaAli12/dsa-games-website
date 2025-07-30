import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Play from '../pages/Play';
import About from '../pages/About';
import SortHero from '../games/SortHero/SortHero';
import MazeEscape from '../games/MazeEscape/MazeEscape';
import BitmaskDungeon from '../games/BitmaskDungeon/BitmaskDungeon';
import GraphWars from '../games/GraphWars/GraphWars';
import DPDungeon from '../games/DPDungeon/DPDungeon';
import CoinQuest from '../games/CoinQuest/CoinQuest';
import NetworkHacker from '../games/NetworkHacker/NetworkHacker';
import TreeClimber from '../games/TreeClimber/TreeClimber';
import RecursionPortal from '../games/RecursionPortal/RecursionPortal';
import StackSurvivor from '../games/StackSurvivor/StackSurvivor';
import SlidingWindowHunter from '../games/SlidingWindowHunter/SlidingWindowHunter';
import HashMapHeist from '../games/HashMapHeist/HashMapHeist';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/play/sort-hero" element={<SortHero />} />
      <Route path="/play/maze-escape" element={<MazeEscape />} />
      <Route path="/play/bitmask-dungeon" element={<BitmaskDungeon />} />
      <Route path="/play/graph-wars" element={<GraphWars />} />
      <Route path="/play/dp-dungeon" element={<DPDungeon />} />
      <Route path="/play/coin-quest" element={<CoinQuest />} />
      <Route path="/play/network-hacker" element={<NetworkHacker />} />
      <Route path="/play/tree-climber" element={<TreeClimber />} />
      <Route path="/play/recursion-portal" element={<RecursionPortal />} />
      <Route path="/play/stack-survivor" element={<StackSurvivor />} />
      <Route path="/play/sliding-window-hunter" element={<SlidingWindowHunter />} />
      <Route path="/play/hashmap-heist" element={<HashMapHeist />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes; 