import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';

const GamesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const gameCategories = [
    {
      id: 'arrays-sorting',
      category: 'Arrays & Sorting',
      description: 'Master array manipulation and sorting algorithms through interactive games',
      level: 'Beginner',
      color: '#6366f1',
      icon: '',
      games: [
        {
          name: 'Sort Hero',
          description: 'Master sorting algorithms through visual array manipulation',
          path: '/games/sort-hero',
          difficulty: 'Beginner',
          concepts: ['Bubble Sort', 'Quick Sort', 'Merge Sort'],
          rating: 4.8,
          players: '2.1k'
        },
        {
          name: 'Array Explorer',
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
      description: 'Explore tree structures and graph algorithms with visual gameplay',
      level: 'Intermediate',
      color: '#10b981',
      icon: '',
      games: [
        {
          name: 'Maze Escape',
          description: 'Navigate mazes using backtracking and pathfinding algorithms',
          path: '/games/maze-escape',
          difficulty: 'Intermediate',
          concepts: ['DFS', 'BFS', 'Backtracking'],
          rating: 4.9,
          players: '3.2k'
        },
        {
          name: 'Graph Wars',
          description: 'Explore graphs with BFS, DFS, and Dijkstra algorithms',
          path: '/games/graph-wars',
          difficulty: 'Advanced',
          concepts: ['Graph Traversal', 'Shortest Path', 'MST'],
          rating: 4.7,
          players: '1.5k'
        },
        {
          name: 'Tree Climber',
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
      description: 'Break down complex problems into optimal subproblems',
      level: 'Advanced',
      color: '#8b5cf6',
      icon: '',
      games: [
        {
          name: 'DP Dungeon',
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
      description: 'Build and manipulate fundamental data structures',
      level: 'Beginner',
      color: '#f59e0b',
      icon: '',
      games: [
        {
          name: 'Stack Attack',
          description: 'Master stack operations through tower-building challenges',
          path: '/games/stack-attack',
          difficulty: 'Beginner',
          concepts: ['LIFO Operations', 'Expression Evaluation', 'Recursion'],
          rating: 4.6,
          players: '2.5k'
        },
        {
          name: 'Queue Quest',
          description: 'Learn queue operations through simulation games',
          path: '/games/queue-quest',
          difficulty: 'Beginner',
          concepts: ['FIFO Operations', 'Priority Queues', 'Circular Queues'],
          rating: 4.5,
          players: '2.0k'
        },
        {
          name: 'Heap Heroes',
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
      id: 'bit-manipulation',
      category: 'Bit Manipulation',
      description: 'Master bitwise operations and bit manipulation techniques',
      level: 'Intermediate',
      color: '#8b5cf6',
      icon: '',
      games: [
        {
          name: 'Bitmask Dungeon',
          description: 'Solve puzzles using bit manipulation and subset problems',
          path: '/games/bitmask-dungeon',
          difficulty: 'Intermediate',
          concepts: ['Bitwise Operations', 'Subset Generation', 'Bitmasking'],
          rating: 4.3,
          players: '1.1k'
        }
      ]
    },
    {
      id: 'greedy-algorithms',
      category: 'Greedy Algorithms',
      description: 'Learn optimization through greedy approach techniques',
      level: 'Intermediate',
      color: '#f59e0b',
      icon: '',
      games: [
        {
          name: 'Coin Quest',
          description: 'Learn greedy algorithms through coin optimization challenges',
          path: '/games/coin-quest',
          difficulty: 'Beginner',
          concepts: ['Greedy Strategy', 'Optimization', 'Local vs Global'],
          rating: 4.1,
          players: '1.4k'
        }
      ]
    },
    {
      id: 'hashing',
      category: 'Hashing & Maps',
      description: 'Efficient data storage and retrieval using hash functions',
      level: 'Intermediate',
      color: '#06b6d4',
      icon: '',
      games: [
        {
          name: 'HashMap Heist',
          description: 'Crack codes using hashing and frequency analysis',
          path: '/games/hashmap-heist',
          difficulty: 'Intermediate',
          concepts: ['Hash Tables', 'Collision Resolution', 'Frequency Counting'],
          rating: 4.5,
          players: '1.7k'
        }
      ]
    },
    {
      id: 'union-find',
      category: 'Union-Find & Disjoint Sets',
      description: 'Connect components and manage disjoint sets efficiently',
      level: 'Advanced',
      color: '#ef4444',
      icon: '',
      games: [
        {
          name: 'Network Hacker',
          description: 'Connect networks using Union-Find and disjoint sets',
          path: '/games/network-hacker',
          difficulty: 'Advanced',
          concepts: ['Union-Find', 'Path Compression', 'Connected Components'],
          rating: 4.2,
          players: '950'
        }
      ]
    },
    {
      id: 'recursion',
      category: 'Recursion & Backtracking',
      description: 'Master recursive thinking and backtracking algorithms',
      level: 'Intermediate',
      color: '#10b981',
      icon: '',
      games: [
        {
          name: 'Recursion Portal',
          description: 'Enter recursive dimensions and understand call stacks',
          path: '/games/recursion-portal',
          difficulty: 'Intermediate',
          concepts: ['Recursive Thinking', 'Base Cases', 'Call Stack'],
          rating: 4.0,
          players: '1.3k'
        }
      ]
    },
    {
      id: 'sliding-window',
      category: 'Sliding Window',
      description: 'Efficient subarray and substring problems using sliding window technique',
      level: 'Intermediate',
      color: '#8b5cf6',
      icon: '',
      games: [
        {
          name: 'Sliding Window Hunter',
          description: 'Hunt targets using sliding window techniques',
          path: '/games/sliding-window-hunter',
          difficulty: 'Intermediate',
          concepts: ['Two Pointers', 'Window Expansion', 'Optimization'],
          rating: 4.3,
          players: '1.0k'
        }
      ]
    },
    {
      id: 'string-algorithms',
      category: 'String Algorithms',
      description: 'Master string manipulation and pattern matching algorithms',
      level: 'Intermediate',
      color: '#ec4899',
      icon: '',
      games: [
        {
          name: 'String Master',
          description: 'Learn string matching algorithms like KMP, Boyer-Moore, and Rabin-Karp',
          path: '/games/string-master',
          difficulty: 'Intermediate',
          concepts: ['KMP', 'Boyer-Moore', 'Rabin-Karp', 'Pattern Matching'],
          rating: 4.4,
          players: '1.2k'
        }
      ]
    },
    {
      id: 'pattern-matching',
      category: 'Pattern Matching',
      description: 'Advanced pattern recognition and regular expressions',
      level: 'Intermediate',
      color: '#f97316',
      icon: '',
      games: [
        {
          name: 'Regex Runner',
          description: 'Master regular expressions and pattern matching techniques',
          path: '/games/regex-runner',
          difficulty: 'Intermediate',
          concepts: ['Regex', 'Pattern Matching', 'String Processing'],
          rating: 4.2,
          players: '980'
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

  // Enhanced filtering logic
  const allGames = gameCategories.flatMap(cat => 
    cat.games.map(game => ({ ...game, category: cat.category, categoryColor: cat.color }))
  );

  const filteredGames = allGames.filter(game => {
    const matchesCategory = selectedCategory === 'all' || 
      gameCategories.find(cat => cat.games.includes(game) || cat.id === selectedCategory);
    const matchesDifficulty = selectedDifficulty === 'all' || game.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.concepts.some(concept => concept.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const filteredCategories = selectedCategory === 'all' 
    ? gameCategories 
    : gameCategories.filter(cat => cat.id === selectedCategory);

  // Get unique difficulties for filter
  const difficulties = [...new Set(allGames.map(game => game.difficulty))].sort();

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
              Choose from 20+ games across 13 categories, each designed to teach core concepts.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Games Available</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">13</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Filter Section */}
        <section className="filter-section">
          <div className="filter-container">
            <div className="filter-header">
              <h3>Find Your Perfect Game</h3>
              <div className="results-count">
                {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="search-container">
              <div className="search-box">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input
                  type="text"
                  placeholder="Search games, concepts, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            {/* Filters */}
            <div className="advanced-filters">
              <div className="filter-group">
                <label>Category:</label>
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
                      {category.category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter-group">
                <label>Difficulty:</label>
                <div className="difficulty-filters">
                  <button 
                    className={`filter-btn ${selectedDifficulty === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedDifficulty('all')}
                  >
                    All Levels
                  </button>
                  {difficulties.map((difficulty) => (
                    <button 
                      key={difficulty}
                      className={`filter-btn ${selectedDifficulty === difficulty ? 'active' : ''}`}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      style={{ '--category-color': getDifficultyColor(difficulty) }}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
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
              {filteredGames
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)
                .map((game, index) => (
                  <div key={index} className="featured-card" onClick={() => handlePlayGame(game.path)}>
                    <div className="game-header">
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
                    <div className="category-icon"></div>
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
                            <span>★ {game.rating}</span>
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
  
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .games-container {
          font-family: var(--font-primary);
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
          padding: var(--spacing-xl) var(--spacing-lg);
          background: linear-gradient(135deg, var(--primary-50) 0%, var(--neutral-100) 100%);
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: var(--primary-600);
          color: var(--text-inverse);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          margin-bottom: var(--spacing-lg);
        }

        .games-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
        }

        .games-hero p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xl);
          line-height: 1.7;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: var(--spacing-2xl);
          margin-top: var(--spacing-xl);
        }

        .hero-stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-600);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Filter Section */
        .filter-section {
          padding: var(--spacing-2xl) var(--spacing-lg);
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        .filter-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .filter-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .results-count {
          background: var(--primary-500);
          color: var(--text-inverse);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Search Styles */
        .search-container {
          margin-bottom: 2rem;
        }

        .search-box {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 1.2rem;
        }

        .search-input {
          width: 100%;
          padding: var(--spacing-md) var(--spacing-xl) var(--spacing-md) var(--spacing-xl);
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          font-size: 1rem;
          background: var(--background);
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-input::placeholder {
          color: var(--text-secondary);
        }

        .clear-search {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 1.2rem;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .clear-search:hover {
          background: var(--border);
          color: var(--text-primary);
        }

        /* Advanced Filters */
        .advanced-filters {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .filter-group label {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .category-filters, .difficulty-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .category-filters .filter-btn, .difficulty-filters .filter-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: var(--background);
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-sm) var(--spacing-md);
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
          font-size: 0.9rem;
        }

        .category-filters .filter-btn:hover, .difficulty-filters .filter-btn:hover {
          border-color: var(--primary-500);
          color: var(--primary-500);
          transform: translateY(calc(-1 * var(--spacing-xs)));
        }

        .category-filters .filter-btn.active, .difficulty-filters .filter-btn.active {
          background: var(--category-color, var(--primary-500));
          color: var(--text-inverse);
          border-color: var(--category-color, var(--primary-500));
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: var(--background);
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-sm) var(--spacing-md);
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          border-color: var(--primary-500);
          color: var(--primary-500);
          transform: translateY(calc(-1 * var(--spacing-xs)));
        }

        .filter-btn.active {
          background: var(--category-color, var(--primary-500));
          color: var(--text-inverse);
          border-color: var(--category-color, var(--primary-500));
        }

        .filter-icon {
          font-size: 1.25rem;
        }

        /* Featured Section */
        .featured-section {
          padding: var(--spacing-xl) var(--spacing-lg);
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
          margin-bottom: var(--spacing-sm);
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
          gap: var(--spacing-lg);
        }

        .featured-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: var(--spacing-lg);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .featured-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #ffd700, #ffed4e, var(--accent-color));
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .featured-card:hover {
          transform: translateY(calc(-1 * var(--spacing-md))) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border-color: var(--warning-color);
        }

        .featured-card:hover::before {
          transform: scaleX(1);
        }

        .featured-card .game-content h4 {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: var(--spacing-md);
          transition: all var(--transition-normal);
        }

        .featured-card:hover .game-content h4 {
          color: var(--warning-color);
          transform: translateX(var(--spacing-xs));
        }

        .featured-card .game-content p {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: var(--spacing-lg);
          font-size: 1.05rem;
        }

        .game-meta {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .category-tag {
          background: var(--category-color);
          color: var(--text-white);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: var(--shadow-sm);
        }

        .difficulty-tag {
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-md);
          background: var(--background);
          border: 1px solid var(--border);
        }

        .play-btn {
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
          color: var(--text-inverse);
          border: none;
          padding: var(--spacing-md) var(--spacing-xl);
          border-radius: var(--radius-lg);
          font-weight: 700;
          font-size: 1.1rem;
          transition: all var(--transition-normal);
          width: 100%;
          box-shadow: var(--shadow-md);
        }

        .play-btn:hover {
          transform: translateY(calc(-1 * var(--spacing-xs))) scale(1.05);
          box-shadow: var(--shadow-lg);
          background: linear-gradient(135deg, var(--primary-700), var(--primary-600));
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
          background: var(--primary-600);
          transform: translateY(calc(-1 * var(--spacing-xs)));
        }

        /* Games Section */
        .games-section {
          padding: var(--spacing-xl) var(--spacing-lg);
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

        .category-header .category-icon:empty {
          display: none;
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
          gap: var(--spacing-lg);
        }

        .game-card {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          transition: all var(--transition-normal);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .game-card:hover {
          transform: translateY(calc(-1 * var(--spacing-sm)));
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-500);
        }

        .game-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .game-card:hover::before {
          transform: scaleX(1);
        }

        /* Enhanced Game Card Content */
        .game-card .game-content h4 {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
          transition: color var(--transition-fast);
        }

        .game-card:hover .game-content h4 {
          color: var(--primary-500);
        }

        .game-card .game-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-md);
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
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .concept-tag:hover {
          background: var(--primary-color);
          color: var(--text-white);
          border-color: var(--primary-color);
          transform: translateY(-1px);
        }

        .game-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--border-medium);
        }

        .game-stats {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.85rem;
        }

        .game-stats span:first-child {
          color: var(--warning-color);
          font-weight: 700;
          font-size: 0.9rem;
        }

        .game-stats span:last-child {
          color: var(--text-muted);
        }

        .game-footer .play-btn {
          background: var(--primary-500);
          color: var(--text-inverse);
          border: none;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          transition: all var(--transition-fast);
        }

        .game-footer .play-btn:hover {
          background: var(--primary-600);
          transform: translateY(calc(-1 * var(--spacing-xs))) scale(1.05);
          box-shadow: var(--shadow-md);
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
          margin-bottom: var(--spacing-sm);
        }

        .game-card .game-content p {
          margin-bottom: var(--spacing-md);
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
          gap: var(--spacing-md);
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
          color: var(--primary-500);
          border: none;
          padding: 0;
          font-weight: 600;
          font-size: 0.95rem;
          width: auto;
        }

        .game-footer .play-btn:hover {
          color: var(--primary-600);
          background: var(--primary-100);
          transform: translateX(var(--spacing-xs));
        }

        /* CTA Section */
        .cta-section {
          padding: var(--spacing-2xl) var(--spacing-lg);
          background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%);
          color: var(--text-inverse);
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
          margin-bottom: var(--spacing-xl);
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Button Styles */
        .primary-btn {
          background: var(--primary-500);
          color: var(--text-inverse);
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          transition: all var(--transition-fast);
          border: none;
          cursor: pointer;
        }

        .primary-btn:hover {
          background: var(--primary-600);
          transform: translateY(calc(-1 * var(--spacing-xs)));
          box-shadow: var(--shadow-lg);
        }

        .primary-btn.large {
          padding: var(--spacing-md) var(--spacing-xl);
          font-size: 1.1rem;
        }

        .secondary-btn {
          background: transparent;
          color: var(--text-primary);
          padding: var(--spacing-sm) var(--spacing-lg);
          border: 2px solid var(--border);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .secondary-btn:hover {
          border-color: var(--primary-500);
          color: var(--primary-500);
          transform: translateY(calc(-1 * var(--spacing-xs)));
        }

        .secondary-btn.large {
          padding: var(--spacing-md) var(--spacing-xl);
          font-size: 1.1rem;
        }

        .cta-buttons .primary-btn {
          background: var(--text-inverse);
          color: var(--primary-500);
        }

        .cta-buttons .primary-btn:hover {
          background: var(--surface);
          transform: translateY(calc(-1 * var(--spacing-xs)));
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .cta-buttons .secondary-btn {
          background: transparent;
          color: var(--text-inverse);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .cta-buttons .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--text-inverse);
          color: var(--text-inverse);
          transform: translateY(calc(-1 * var(--spacing-xs)));
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

          .advanced-filters {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .filter-header {
            flex-direction: column;
            align-items: flex-start;
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

          .category-filters, .difficulty-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }

          .filter-btn {
            flex-shrink: 0;
          }

          .search-input {
            padding: 0.8rem 2.5rem 0.8rem 2.5rem;
            font-size: 0.9rem;
          }

          .search-icon {
            left: 0.8rem;
            font-size: 1rem;
          }

          .clear-search {
            right: 0.8rem;
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