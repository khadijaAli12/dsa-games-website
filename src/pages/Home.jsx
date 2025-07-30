import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Home.scss';

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const gameCategories = [
    {
      category: 'Arrays & Sorting',
      icon: '📊',
      description: 'Master array manipulation and sorting algorithms through interactive games',
      level: 'Beginner',
      games: [
        {
          name: 'Sort Hero',
          icon: '🔁',
          description: 'Master sorting algorithms through visual array manipulation',
          path: '/play/sort-hero',
          difficulty: 'Beginner',
          concepts: ['Bubble Sort', 'Quick Sort', 'Merge Sort']
        }
      ]
    },
    {
      category: 'Trees & Graph Traversal',
      icon: '🌳',
      description: 'Explore tree structures and graph algorithms with visual gameplay',
      level: 'Intermediate',
      games: [
        {
          name: 'Maze Escape',
          icon: '🐀',
          description: 'Navigate mazes using backtracking and pathfinding algorithms',
          path: '/play/maze-escape',
          difficulty: 'Intermediate',
          concepts: ['DFS', 'BFS', 'Backtracking']
        },
        {
          name: 'Graph Wars',
          icon: '🛣️',
          description: 'Explore graphs with BFS, DFS, and Dijkstra algorithms',
          path: '/play/graph-wars',
          difficulty: 'Advanced',
          concepts: ['Graph Traversal', 'Shortest Path', 'MST']
        },
        {
          name: 'Tree Climber',
          icon: '⛏️',
          description: 'Climb trees with various traversal algorithms',
          path: '/play/tree-climber',
          difficulty: 'Intermediate',
          concepts: ['Tree Traversal', 'Binary Trees', 'AVL Trees']
        }
      ]
    },
    {
      category: 'Dynamic Programming',
      icon: '🧩',
      description: 'Break down complex problems into optimal subproblems',
      level: 'Advanced',
      games: [
        {
          name: 'DP Dungeon',
          icon: '📦',
          description: 'Master dynamic programming through grid-based challenges',
          path: '/play/dp-dungeon',
          difficulty: 'Expert',
          concepts: ['Memoization', 'Tabulation', 'State Optimization']
        }
      ]
    },
    {
      category: 'Bit Manipulation',
      icon: '🔢',
      description: 'Master bitwise operations and binary number systems',
      level: 'Advanced',
      games: [
        {
          name: 'Bitmask Dungeon',
          icon: '🔑',
          description: 'Solve puzzles using bit manipulation and subset problems',
          path: '/play/bitmask-dungeon',
          difficulty: 'Advanced',
          concepts: ['Bitwise Operations', 'Subset Generation', 'Bit Patterns']
        }
      ]
    },
    {
      category: 'String Algorithms',
      icon: '📝',
      description: 'Pattern matching and string processing challenges',
      level: 'Intermediate',
      games: [
        {
          name: 'String Master',
          icon: '🔤',
          description: 'Master string algorithms through pattern matching games',
          path: '/play/string-master',
          difficulty: 'Intermediate',
          concepts: ['KMP', 'Boyer-Moore', 'Suffix Arrays']
        },
        {
          name: 'Regex Runner',
          icon: '🎯',
          description: 'Learn regular expressions through interactive challenges',
          path: '/play/regex-runner',
          difficulty: 'Beginner',
          concepts: ['Pattern Matching', 'Automata', 'Text Processing']
        }
      ]
    },
    {
      category: 'Mathematical Algorithms',
      icon: '🧮',
      description: 'Number theory and mathematical problem solving',
      level: 'Intermediate',
      games: [
        {
          name: 'Number Ninja',
          icon: '🥷',
          description: 'Solve mathematical puzzles using algorithmic thinking',
          path: '/play/number-ninja',
          difficulty: 'Intermediate',
          concepts: ['Prime Numbers', 'GCD/LCM', 'Modular Arithmetic']
        },
        {
          name: 'Crypto Quest',
          icon: '🔐',
          description: 'Learn cryptographic algorithms through puzzle solving',
          path: '/play/crypto-quest',
          difficulty: 'Advanced',
          concepts: ['Encryption', 'Hashing', 'Digital Signatures']
        }
      ]
    },
    {
      category: 'Data Structures',
      icon: '🏗️',
      description: 'Build and manipulate fundamental data structures',
      level: 'Beginner',
      games: [
        {
          name: 'Stack Attack',
          icon: '📚',
          description: 'Master stack operations through tower-building challenges',
          path: '/play/stack-attack',
          difficulty: 'Beginner',
          concepts: ['LIFO Operations', 'Expression Evaluation', 'Recursion']
        },
        {
          name: 'Queue Quest',
          icon: '🚶‍♂️',
          description: 'Learn queue operations through simulation games',
          path: '/play/queue-quest',
          difficulty: 'Beginner',
          concepts: ['FIFO Operations', 'Priority Queues', 'Circular Queues']
        },
        {
          name: 'Heap Heroes',
          icon: '⛰️',
          description: 'Build and maintain heap structures in challenging scenarios',
          path: '/play/heap-heroes',
          difficulty: 'Intermediate',
          concepts: ['Min/Max Heap', 'Heap Sort', 'Priority Queues']
        }
      ]
    }
  ];

  const learningFeatures = [
    {
      title: 'Interactive Visualizations',
      description: 'See algorithms in action with step-by-step visual explanations',
      icon: '🎯'
    },
    {
      title: 'Code Playground',
      description: 'Practice implementations in multiple programming languages',
      icon: '💻'
    },
    {
      title: 'Complexity Analysis',
      description: 'Learn time and space complexity with real examples',
      icon: '📈'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey and concept mastery',
      icon: '📊'
    }
  ];

  const fundamentalConcepts = [
    {
      concept: "Time Complexity",
      notation: "O(n)",
      explanation: "Measures how algorithm runtime grows with input size",
      examples: ["O(1) - Constant", "O(log n) - Logarithmic", "O(n) - Linear", "O(n²) - Quadratic"]
    },
    {
      concept: "Space Complexity", 
      notation: "O(n)",
      explanation: "Measures additional memory usage relative to input size",
      examples: ["In-place - O(1)", "Recursive - O(h)", "Dynamic arrays - O(n)"]
    },
    {
      concept: "Algorithm Design",
      notation: "Paradigms",
      explanation: "Different approaches to solving computational problems",
      examples: ["Divide & Conquer", "Greedy", "Dynamic Programming", "Backtracking"]
    }
  ];

  return (
    <>
      {/* Clean Navbar */}
      <motion.nav 
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">DSAGames</span>
          </div>
          
          <div className="nav-links">
            <a href="#concepts">Concepts</a>
            <a href="#games">Games</a>
            <a href="#practice">Practice</a>
            <Link to="/play" className="nav-cta">
              Start Playing
            </Link>
          </div>
        </div>
      </motion.nav>

      <div className="home" ref={containerRef}>
        {/* Hero Section */}
        <motion.section 
          className="hero"
          style={{ y }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero-badge">
                Data Structures & Algorithms
              </div>
              
              <h1 className="hero-title">
                Master <span className="highlight">Computer Science</span><br />
                Fundamentals
              </h1>
              
              <p className="hero-subtitle">
                Learn data structures and algorithms through interactive visualizations, 
                practical examples, and guided problem-solving exercises.
              </p>
              
              <div className="hero-actions">
                <Link to="/learn" className="primary-btn">
                  Start Learning
                </Link>
                <Link to="/concepts" className="secondary-btn">
                  Explore Concepts
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Interactive Games</span>
                </div>
                <div className="stat">
                  <span className="stat-number">7</span>
                  <span className="stat-label">Categories</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Algorithms</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="hero-visual"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="algorithm-demo">
                <div className="demo-title">Binary Search Visualization</div>
                <div className="array-visualization">
                  {[1, 3, 5, 7, 9, 11, 13, 15].map((num, index) => (
                    <motion.div
                      key={index}
                      className={`array-element ${index === 4 ? 'active' : ''}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>
                <div className="complexity-info">
                  <span>Time: O(log n)</span>
                  <span>Space: O(1)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Fundamental Concepts */}
        <section className="concepts-section" id="concepts">
          <div className="section-header">
            <h2>Core Concepts</h2>
            <p>Build a strong foundation in computational thinking</p>
          </div>
          
          <div className="concepts-grid">
            {fundamentalConcepts.map((item, index) => (
              <motion.div
                key={index}
                className="concept-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="concept-header">
                  <h3>{item.concept}</h3>
                  <span className="notation">{item.notation}</span>
                </div>
                <p className="concept-explanation">{item.explanation}</p>
                <div className="concept-examples">
                  {item.examples.map((example, i) => (
                    <span key={i} className="example-tag">{example}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Game Categories */}
        <section className="games-section" id="games">
          <div className="section-header">
            <h2>Interactive Learning Games</h2>
            <p>Master algorithms through hands-on gameplay across different categories</p>
          </div>
          
          <div className="categories-container">
            {gameCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="category-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="category-header">
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
                    <motion.div
                      key={gameIndex}
                      className="game-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (categoryIndex * 0.1) + (gameIndex * 0.05) }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      viewport={{ once: true }}
                    >
                      <div className="game-header">
                        <div className="game-icon">{game.icon}</div>
                        <div className="difficulty-badge">{game.difficulty}</div>
                      </div>
                      
                      <div className="game-content">
                        <h4>{game.name}</h4>
                        <p>{game.description}</p>
                        
                        <div className="game-concepts">
                          {game.concepts.map((concept, i) => (
                            <span key={i} className="concept-tag">{concept}</span>
                          ))}
                        </div>
                        
                        <Link to={game.path} className="play-btn">
                          Play Game →
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Learning Features */}
        <section className="features-section">
          <div className="section-header">
            <h2>How You'll Learn</h2>
            <p>Modern tools and methodologies for effective learning</p>
          </div>
          
          <div className="features-grid">
            {learningFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h2>Ready to Master DSA?</h2>
            <p>Join thousands of students building strong algorithmic thinking skills</p>
            <div className="cta-buttons">
              <Link to="/learn" className="primary-btn large">
                Begin Your Journey
              </Link>
              <Link to="/practice" className="secondary-btn large">
                Practice Problems
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Home;