import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';

const GamesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const gameCategories = [
    {
      id: 'arrays-sorting',
      category: 'Arrays & Sorting',
      icon: '📊',
      description: 'Master array manipulation and sorting algorithms through interactive games',
      level: 'Beginner',
      color: '#6366f1',
      games: [
        {
          name: 'Sort Hero',
          icon: '🔁',
          description: 'Master sorting algorithms through visual array manipulation',
          path: '/games/sort-hero',
          difficulty: 'Beginner',
          concepts: ['Bubble Sort', 'Quick Sort', 'Merge Sort'],
          rating: 4.8,
          players: '2.1k'
        },
        {
          name: 'Array Explorer',
          icon: '🔍',
          description: 'Navigate arrays with search and traversal algorithms',
          path: '/games/array-explorer',
          difficulty: 'Beginner',
          concepts: ['Linear Search', 'Binary Search', 'Two Pointers'],
          rating: 4.6,
          players: '1.8k'
        }
      ]
    },
    {
      id: 'trees-graphs',
      category: 'Trees & Graph Traversal',
      icon: '🌳',
      description: 'Explore tree structures and graph algorithms with visual gameplay',
      level: 'Intermediate',
      color: '#10b981',
      games: [
        {
          name: 'Maze Escape',
          icon: '🐀',
          description: 'Navigate mazes using backtracking and pathfinding algorithms',
          path: '/games/maze-escape',
          difficulty: 'Intermediate',
          concepts: ['DFS', 'BFS', 'Backtracking'],
          rating: 4.9,
          players: '3.2k'
        },
        {
          name: 'Graph Wars',
          icon: '🛣️',
          description: 'Explore graphs with BFS, DFS, and Dijkstra algorithms',
          path: '/games/graph-wars',
          difficulty: 'Advanced',
          concepts: ['Graph Traversal', 'Shortest Path', 'MST'],
          rating: 4.7,
          players: '1.5k'
        },
        {
          name: 'Tree Climber',
          icon: '⛏️',
          description: 'Climb trees with various traversal algorithms',
          path: '/games/tree-climber',
          difficulty: 'Intermediate',
          concepts: ['Tree Traversal', 'Binary Trees', 'AVL Trees'],
          rating: 4.5,
          players: '1.9k'
        }
      ]
    },
    {
      id: 'dynamic-programming',
      category: 'Dynamic Programming',
      icon: '🧩',
      description: 'Break down complex problems into optimal subproblems',
      level: 'Advanced',
      color: '#8b5cf6',
      games: [
        {
          name: 'DP Dungeon',
          icon: '📦',
          description: 'Master dynamic programming through grid-based challenges',
          path: '/games/dp-dungeon',
          difficulty: 'Expert',
          concepts: ['Memoization', 'Tabulation', 'State Optimization'],
          rating: 4.4,
          players: '890'
        }
      ]
    },
    {
      id: 'data-structures',
      category: 'Data Structures',
      icon: '🏗️',
      description: 'Build and manipulate fundamental data structures',
      level: 'Beginner',
      color: '#f59e0b',
      games: [
        {
          name: 'Stack Attack',
          icon: '📚',
          description: 'Master stack operations through tower-building challenges',
          path: '/games/stack-attack',
          difficulty: 'Beginner',
          concepts: ['LIFO Operations', 'Expression Evaluation', 'Recursion'],
          rating: 4.6,
          players: '2.5k'
        },
        {
          name: 'Queue Quest',
          icon: '🚶‍♂️',
          description: 'Learn queue operations through simulation games',
          path: '/games/queue-quest',
          difficulty: 'Beginner',
          concepts: ['FIFO Operations', 'Priority Queues', 'Circular Queues'],
          rating: 4.5,
          players: '2.0k'
        },
        {
          name: 'Heap Heroes',
          icon: '⛰️',
          description: 'Build and maintain heap structures in challenging scenarios',
          path: '/games/heap-heroes',
          difficulty: 'Intermediate',
          concepts: ['Min/Max Heap', 'Heap Sort', 'Priority Queues'],
          rating: 4.3,
          players: '1.3k'
        }
      ]
    },
    {
      id: 'strings',
      category: 'String Algorithms',
      icon: '📝',
      description: 'Pattern matching and string processing challenges',
      level: 'Intermediate',
      color: '#06b6d4',
      games: [
        {
          name: 'String Master',
          icon: '🔤',
          description: 'Master string algorithms through pattern matching games',
          path: '/games/string-master',
          difficulty: 'Intermediate',
          concepts: ['KMP', 'Boyer-Moore', 'Suffix Arrays'],
          rating: 4.4,
          players: '1.2k'
        },
        {
          name: 'Regex Runner',
          icon: '🎯',
          description: 'Learn regular expressions through interactive challenges',
          path: '/games/regex-runner',
          difficulty: 'Beginner',
          concepts: ['Pattern Matching', 'Automata', 'Text Processing'],
          rating: 4.2,
          players: '1.6k'
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handlePlayGame = (gamePath) => {
    if (gamePath) {
      navigate(gamePath);
    }
  };

  const handleStartWithSortHero = () => {
    navigate('/games/sort-hero');
  };

  const handleLearnConcepts = () => {
    navigate('/concepts');
  };

  const filteredCategories = selectedCategory === 'all' 
    ? gameCategories 
    : gameCategories.filter(cat => cat.id === selectedCategory);

  const allGames = gameCategories.flatMap(cat => 
    cat.games.map(game => ({ ...game, category: cat.category, categoryColor: cat.color }))
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      case 'Expert': return '#dc2626';
      default: return '#6b7280';
    }
  };

  return (
    <div className="games-container">
      <Navbar />

      <div className="games-page">
        {/* Hero Section */}
        <section className="games-hero">
          <div className="hero-content">
            <div className="hero-badge">Interactive Learning Games</div>
            <h1>Learn Through Play</h1>
            <p>
              Master data structures and algorithms through engaging, interactive games. 
              Choose from 12+ games across 5 categories, each designed to teach core concepts.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">12+</span>
                <span className="stat-label">Games Available</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="filter-section">
          <div className="filter-container">
            <h3>Browse by Category</h3>
            <div className="category-filters">
              <button 
                className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Games
              </button>
              {gameCategories.map((category) => (
                <button 
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{ '--category-color': category.color }}
                >
                  <span className="filter-icon">{category.icon}</span>
                  {category.category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Games */}
        {selectedCategory === 'all' && (
          <section className="featured-section">
            <div className="section-header">
              <h2>Featured Games</h2>
              <p>Most popular games across all categories</p>
            </div>
            
            <div className="featured-grid">
              {allGames
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)
                .map((game, index) => (
                  <div key={index} className="featured-card" onClick={() => handlePlayGame(game.path)}>
                    <div className="game-header">
                      <div className="game-icon">{game.icon}</div>
                    </div>
                    <div className="game-content">
                      <h4>{game.name}</h4>
                      <p>{game.description}</p>
                      <div className="game-meta">
                        <span className="category-tag" style={{ backgroundColor: game.categoryColor }}>
                          {game.category}
                        </span>
                        <span className="difficulty-tag" style={{ color: getDifficultyColor(game.difficulty) }}>
                          {game.difficulty}
                        </span>
                      </div>
                      <div className="play-btn-container">
                        <button className="play-btn">Play Now →</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Games by Category */}
        <section className="games-section">
          <div className="categories-container">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="category-section">
                <div className="category-header" style={{ '--category-color': category.color }}>
                  <div className="category-info">
                    <div className="category-icon">{category.icon}</div>
                    <div className="category-details">
                      <h3>{category.category}</h3>
                      <p>{category.description}</p>
                    </div>
                  </div>
                  <div className="category-level">{category.level}</div>
                </div>
                
                <div className="games-grid">
                  {category.games.map((game, gameIndex) => (
                    <div
                      key={gameIndex}
                      className="game-card"
                      onClick={() => handlePlayGame(game.path)}
                    >
                      <div className="game-header">
                        <div className="game-icon">{game.icon}</div>
                        <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(game.difficulty) }}>
                          {game.difficulty}
                        </div>
                      </div>
                      
                      <div className="game-content">
                        <h4>{game.name}</h4>
                        <p>{game.description}</p>
                        
                        <div className="game-concepts">
                          {game.concepts.map((concept, i) => (
                            <span key={i} className="concept-tag">{concept}</span>
                          ))}
                        </div>
                        
                        <div className="game-footer">
                          <div className="game-stats">
                            <span>⭐ {game.rating}</span>
                            <span>{game.players} players</span>
                          </div>
                          <button className="play-btn">
                            Play Game →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Start Playing?</h2>
            <p>Join thousands of students mastering algorithms through interactive gameplay</p>
            <div className="cta-buttons">
              <button className="primary-btn large" onClick={handleStartWithSortHero}>
                Start with Sort Hero
              </button>
              <button className="secondary-btn large" onClick={handleLearnConcepts}>
                Learn Concepts First
              </button>
            </div>
          </div>
        </section>
      </div>
      <style jsx>{`
        :root {
--primary-color: #7f80baff;
--secondary-color: #8b0426;
--accent-color: #8b5cf6;
--success-color: #10b981;
--warning-color: #f59e0b;
--error-color: #ef4444;

--background: #aea2e2ff;
--surface: linear-gradient(135deg, rgb(220, 221, 228) 0%, #e3e2e4 50%, #d8d5d8 100%);
--surface-hover: #633c3c;
--surface-dark: #f8f0f0;
--border: #ece9e9;
--border-light: #ece7e7;

--text-primary: #000000;
--text-secondary: #000000;
--text-muted: #0a0a0aff;
--text-white: #070606;
--text-accent: #2123a1;

--gradient-primary: linear-gradient(140deg, #6e2020ff 0%, #050404 100%);
--gradient-secondary: linear-gradient(135deg, #9826a5 0%, #f5576c 100%);
--gradient-accent: linear-gradient(135deg, #1a706a 0%, #610b26 100%);
--gradient-hero: linear-gradient(135deg, #0a133b 0%, #322242 50%, #3f1444 100%);

--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-colored: 0 10px 25px -3px rgb(102 102 241 / 0.2);

--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-2xl: 1.5rem;
}
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .games-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
          min-height: 100vh;
        }
        /* Page Layout */
        .games-page {
          padding-top: 4rem;
        }

        /* Hero Section */
        .games-hero {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: var(--primary-color);
          color: var(--text-white);
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          margin-bottom: 1.5rem;
        }

        .games-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .games-hero p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
        }

        .hero-stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Filter Section */
        .filter-section {
          padding: 3rem 2rem;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        .filter-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .filter-container h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .category-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--background);
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 0.75rem 1.25rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
          transform: translateY(-1px);
        }

        .filter-btn.active {
          background: var(--category-color, var(--primary-color));
          color: var(--text-white);
          border-color: var(--category-color, var(--primary-color));
        }

        .filter-icon {
          font-size: 1.25rem;
        }

        /* Featured Section */
        .featured-section {
          padding: 4rem 2rem;
          background: var(--background);
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .section-header p {
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        .featured-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .featured-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .featured-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ffd700, #ffed4e);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .featured-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--warning-color);
        }

        .featured-card:hover::before {
          transform: scaleX(1);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: var(--text-primary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .game-icon {
          font-size: 2.5rem;
          width: 4rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }

        .game-rating {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }

        .game-rating span:first-child {
          font-weight: 600;
          color: var(--warning-color);
        }

        .players {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .game-content h4 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .game-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .game-meta {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .category-tag {
          color: var(--text-white);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .difficulty-tag {
          font-weight: 600;
          font-size: 0.8rem;
        }

        .play-btn-container {
          text-align: center;
        }

        .play-btn {
          background: var(--primary-color);
          color: var(--text-white);
          border: none;
          padding: 0.875rem 2rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .play-btn:hover {
          background: var(--secondary-color);
          transform: translateY(-1px);
        }

        /* Games Section */
        .games-section {
          padding: 4rem 2rem;
          background: var(--surface);
        }

        .categories-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .category-section {
          margin-bottom: 4rem;
        }

        .category-section:last-child {
          margin-bottom: 0;
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--border);
        }

        .category-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .category-header .category-icon {
          font-size: 2.5rem;
          width: 4rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--category-color);
          border-radius: var(--radius-lg);
          color: var(--text-white);
        }

        .category-details h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .category-details p {
          color: var(--text-secondary);
          font-size: 1rem;
          margin: 0;
        }

        .category-level {
          background: var(--category-color);
          color: var(--text-white);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .game-card {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .game-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-color);
        }

        .game-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .game-card:hover::before {
          transform: scaleX(1);
        }

        .game-card .game-header {
          margin-bottom: 1rem;
        }

        .game-card .game-icon {
          width: 3rem;
          height: 3rem;
          font-size: 2rem;
        }

        .difficulty-badge {
          color: var(--text-white);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .game-card .game-content h4 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .game-card .game-content p {
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        .game-concepts {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .concept-tag {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0.25rem 0.625rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .concept-tag:hover {
          background: var(--primary-color);
          color: var(--text-white);
          border-color: var(--primary-color);
        }

        .game-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .game-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
        }

        .game-stats span:first-child {
          color: var(--warning-color);
          font-weight: 600;
        }

        .game-stats span:last-child {
          color: var(--text-muted);
        }

        .game-footer .play-btn {
          background: none;
          color: var(--primary-color);
          border: none;
          padding: 0;
          font-weight: 600;
          font-size: 0.95rem;
          width: auto;
        }

        .game-footer .play-btn:hover {
          color: var(--secondary-color);
          background: none;
          transform: translateX(2px);
        }

        /* CTA Section */
        .cta-section {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: var(--text-white);
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-content h2 {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-size: 1.125rem;
          margin-bottom: 2.5rem;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Button Styles */
        .primary-btn {
          background: var(--primary-color);
          color: var(--text-white);
          padding: 0.875rem 1.75rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .primary-btn:hover {
          background: var(--secondary-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .primary-btn.large {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .secondary-btn {
          background: transparent;
          color: var(--text-primary);
          padding: 0.875rem 1.75rem;
          border: 2px solid var(--border);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .secondary-btn:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
          transform: translateY(-2px);
        }

        .secondary-btn.large {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .cta-buttons .primary-btn {
          background: var(--text-white);
          color: var(--primary-color);
        }

        .cta-buttons .primary-btn:hover {
          background: var(--surface);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .cta-buttons .secondary-btn {
          background: transparent;
          color: var(--text-white);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .cta-buttons .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--text-white);
          color: var(--text-white);
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 1.5rem;
          }

          .featured-grid,
          .games-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }

          .category-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .category-info {
            width: 100%;
          }

          .category-level {
            align-self: flex-start;
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0 1rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .nav-links a {
            font-size: 0.9rem;
          }

          .nav-cta {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
          }

          .games-hero {
            padding: 3rem 1rem;
          }

          .hero-stats {
            gap: 2rem;
          }

          .filter-section,
          .featured-section,
          .games-section,
          .cta-section {
            padding: 3rem 1rem;
          }

          .category-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }

          .filter-btn {
            flex-shrink: 0;
          }

          .featured-grid,
          .games-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .featured-card,
          .game-card {
            padding: 1.25rem;
          }

          .category-header .category-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .category-header .category-icon {
            width: 3rem;
            height: 3rem;
            font-size: 2rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-buttons .primary-btn,
          .cta-buttons .secondary-btn {
            width: 100%;
            max-width: 280px;
          }
        }

        @media (max-width: 480px) {
          .nav-links a:not(.nav-cta) {
            display: none;
          }

          .hero-badge {
            font-size: 0.75rem;
            padding: 0.3rem 0.6rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .category-filters {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .featured-card,
          .game-card {
            padding: 1rem;
          }

          .game-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }

        /* Focus styles for accessibility */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default GamesPage;