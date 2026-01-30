import React from 'react';
import { Link } from 'react-router-dom';
import './Play.scss';

const Play = () => {
  const games = [
    {
      id: 'sort-hero',
      name: 'Sort Hero',
      description: 'Master sorting algorithms through visual array manipulation',
      path: '/play/sort-hero'
    },
    {
      id: 'maze-escape',
      name: 'Maze Escape',
      description: 'Navigate mazes using backtracking and pathfinding algorithms',
      path: '/play/maze-escape'
    },
    {
      id: 'bitmask-dungeon',
      name: 'Bitmask Dungeon',
      description: 'Solve puzzles using bit manipulation and subset problems',
      path: '/play/bitmask-dungeon'
    },
    {
      id: 'graph-wars',
      name: 'Graph Wars',
      description: 'Explore graphs with BFS, DFS, and Dijkstra algorithms',
      path: '/play/graph-wars'
    },
    {
      id: 'dp-dungeon',
      name: 'DP Dungeon',
      description: 'Master dynamic programming through grid-based challenges',
      path: '/play/dp-dungeon'
    },
    {
      id: 'coin-quest',
      name: 'Coin Quest',
      description: 'Learn greedy algorithms through coin optimization',
      path: '/play/coin-quest'
    },
    {
      id: 'network-hacker',
      name: 'Network Hacker',
      description: 'Connect networks using Union-Find and disjoint sets',
      path: '/play/network-hacker'
    },
    {
      id: 'tree-climber',
      name: 'Tree Climber',
      description: 'Climb trees with various traversal algorithms',
      path: '/play/tree-climber'
    },
    {
      id: 'recursion-portal',
      name: 'Recursion Portal',
      description: 'Enter recursive dimensions and understand call stacks',
      path: '/play/recursion-portal'
    },
    {
      id: 'stack-survivor',
      name: 'Stack Survivor',
      description: 'Evaluate expressions using stack-based logic',
      path: '/play/stack-survivor'
    },
    {
      id: 'sliding-window-hunter',
      name: 'Sliding Window Hunter',
      description: 'Hunt targets using sliding window techniques',
      path: '/play/sliding-window-hunter'
    },
    {
      id: 'hashmap-heist',
      name: 'HashMap Heist',
      description: 'Crack codes using hashing and frequency analysis',
      path: '/play/hashmap-heist'
    }
  ];

  return (
    <div className="play-page">
      <div className="play-header">
        <h1>Choose Your Algorithm Adventure</h1>
        <p>Select a game to start learning algorithms through interactive gameplay</p>
      </div>

      <div className="games-container">
        {games.map((game) => (
          <Link key={game.id} to={game.path} className="game-card">

            <div className="game-info">
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
            <div className="play-arrow">→</div>
          </Link>
        ))}
      </div>

      <div className="coming-soon">
        <h2>More Games Coming Soon!</h2>
        <div className="upcoming-games">
          <div className="upcoming-game">

            <h4>Probability Puzzles</h4>
            <p>Learn probability through interactive challenges</p>
          </div>
          <div className="upcoming-game">

            <h4>Linked List Lab</h4>
            <p>Master linked list operations and manipulations</p>
          </div>
          <div className="upcoming-game">

            <h4>Balance Quest</h4>
            <p>Balance trees and understand self-balancing structures</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play; 