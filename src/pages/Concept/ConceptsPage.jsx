import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import TimeComplexityPage from './TimeComplexityPage';
import SpaceComplexityPage from './SpaceComplexityPage';
import AlgorithmDesignPage from './AlgorithmDesignPage';
import DataStructuresPage from './DataStructuresPage';
import SortingAlgorithmsPage from './SortingAlgorithmsPage';
import GraphAlgorithmsPage from './GraphAlgorithmsPage';
import '../Concept/ConceptPage.scss';

const ConceptsPage = () => {
  const navigate = useNavigate(); // updated hook

  const fundamentalConcepts = [
    {
      concept: 'Time Complexity',
      notation: 'O(n)',
      explanation: 'Measures how algorithm runtime grows with input size',
      examples: ['O(1) - Constant', 'O(log n) - Logarithmic', 'O(n) - Linear', 'O(n²) - Quadratic'],
      color: '#6366f1',
    },
    {
      concept: 'Space Complexity',
      notation: 'O(n)',
      explanation: 'Measures additional memory usage relative to input size',
      examples: ['In-place - O(1)', 'Recursive - O(h)', 'Dynamic arrays - O(n)'],
      color: '#8b5cf6',
    },
    {
      concept: 'Algorithm Design',
      notation: 'Paradigms',
      explanation: 'Different approaches to solving computational problems',
      examples: ['Divide & Conquer', 'Greedy', 'Dynamic Programming', 'Backtracking'],
      color: '#10b981',
    },
    {
      concept: 'Data Structures',
      notation: 'Organization',
      explanation: 'Ways to organize and store data for efficient access and modification',
      examples: ['Arrays', 'Linked Lists', 'Trees', 'Hash Tables'],
      color: '#f59e0b',
    },
    {
      concept: 'Sorting Algorithms',
      notation: 'O(n log n)',
      explanation: 'Methods to arrange data in a particular order',
      examples: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort'],
      color: '#ef4444',
    },
    {
      concept: 'Graph Algorithms',
      notation: 'Traversal',
      explanation: 'Techniques for exploring and analyzing graph structures',
      examples: ['BFS', 'DFS', 'Dijkstra', 'Kruskal\'s'],
      color: '#06b6d4',
    },
    {
      concept: 'Search Algorithms',
      notation: 'O(log n)',
      explanation: 'Efficient methods for finding elements in data structures',
      examples: ['Binary Search', 'Linear Search', 'Interpolation Search'],
      color: '#ec4899',
    },
    {
      concept: 'String Algorithms',
      notation: 'Pattern Matching',
      explanation: 'Advanced techniques for text processing and pattern matching',
      examples: ['KMP Algorithm', 'Rabin-Karp', 'Palindromes'],
      color: '#f97316',
    },
    {
      concept: 'Mathematical Algorithms',
      notation: 'Number Theory',
      explanation: 'Computational mathematics for cryptography and number problems',
      examples: ['GCD/LCM', 'Prime Numbers', 'Modular Arithmetic'],
      color: '#8b5cf6',
    },
  ];

  const complexityLevels = [
    { name: 'O(1)', description: 'Constant Time', example: 'Array access', color: '#10b981' },
    { name: 'O(log n)', description: 'Logarithmic Time', example: 'Binary search', color: '#06b6d4' },
    { name: 'O(n)', description: 'Linear Time', example: 'Array traversal', color: '#f59e0b' },
    { name: 'O(n log n)', description: 'Linearithmic Time', example: 'Merge sort', color: '#8b5cf6' },
    { name: 'O(n²)', description: 'Quadratic Time', example: 'Bubble sort', color: '#ef4444' },
    { name: 'O(2^n)', description: 'Exponential Time', example: 'Recursive fibonacci', color: '#dc2626' },
  ];

  
    const handleNavigation = (conceptName) => {
      switch (conceptName) {
        case 'Time Complexity':
          navigate('/concepts/time-complexity');
          break;
        case 'Space Complexity':
          navigate('/concepts/space-complexity');
          break;
        case 'Algorithm Design':
          navigate('/concepts/algorithm-design');
          break;
        case 'Data Structures':
          navigate('/concepts/data-structures');
          break;
        case 'Sorting Algorithms':
          navigate('/concepts/sorting-algorithms');
          break;
        case 'Graph Algorithms':
          navigate('/concepts/graph-algorithms');
          break;
        case 'Search Algorithms':
          navigate('/concepts/search-algorithms');
          break;
        case 'String Algorithms':
          navigate('/concepts/string-algorithms');
          break;
        case 'Mathematical Algorithms':
          navigate('/concepts/mathematical-algorithms');
          break;
        default:
          navigate(`/concepts/${conceptName.toLowerCase().replace(' ', '-')}`);
          break;
      }
  };

  return (
    <div className="concepts-container">
      <Navbar />
      <div className="concepts-page">
        {/* Hero Section */}
        <section className="concepts-hero">
          <div className="hero-content">
            <div className="hero-badge">Core Computer Science Concepts</div>
            <h1>Master the Fundamentals</h1>
            <p>
              Build a strong foundation in data structures and algorithms with comprehensive
              explanations, visual examples, and interactive demonstrations.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => handleNavigation('/practice')}>
                Start Practicing
              </button>
              <button className="secondary-btn" onClick={() => handleNavigation('/games')}>
                Try Interactive Games
              </button>
            </div>
          </div>
        </section>

        {/* Fundamental Concepts Grid */}
        <section className="concepts-section">
          <div className="section-header">
            <h2>Core Concepts</h2>
            <p>Master these fundamental concepts to build strong algorithmic thinking</p>
          </div>
          <div className="concepts-grid">
            {fundamentalConcepts.map((item, index) => (
              <div
                key={index}
                className="concept-card"
                style={{ '--accent-color': item.color }}
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
                <button
                  className="learn-more-btn"
                  onClick={() => handleNavigation(item.concept)}
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Complexity Chart */}
        <section className="complexity-section">
          <div className="section-header">
            <h2>Time Complexity Guide</h2>
            <p>Understanding how algorithms scale with input size</p>
          </div>
          <div className="complexity-chart">
            <div className="chart-header">
              <h3>Common Time Complexities</h3>
              <p>From most efficient to least efficient</p>
            </div>
            <div className="complexity-levels">
              {complexityLevels.map((level, index) => (
                <div
                  key={index}
                  className="complexity-item"
                  style={{ '--level-color': level.color }}
                >
                  <div className="complexity-notation">{level.name}</div>
                  <div className="complexity-details">
                    <h4>{level.description}</h4>
                    <p>Example: {level.example}</p>
                  </div>
                  <div className="complexity-bar">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${Math.min(100, (index + 1) * 15)}%`,
                        backgroundColor: level.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Learning Path */}
        <section className="learning-path">
          <div className="section-header">
            <h2>Your Learning Journey</h2>
            <p>Follow this structured path to master DSA concepts</p>
          </div>
          <div className="path-container">
            <div className="path-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Foundation</h3>
                <p>Start with basic data structures and algorithm analysis</p>
                <button className="step-btn" onClick={() => handleNavigation('/learn/foundation')}>
                  Begin Foundation
                </button>
              </div>
            </div>
            <div className="path-connector"></div>
            <div className="path-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Practice</h3>
                <p>Apply concepts through interactive games and exercises</p>
                <button className="step-btn" onClick={() => handleNavigation('/games')}>
                  Start Games
                </button>
              </div>
            </div>
            <div className="path-connector"></div>
            <div className="path-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Master</h3>
                <p>Solve complex problems and optimize solutions</p>
                <button className="step-btn" onClick={() => handleNavigation('/practice')}>
                  Advanced Practice
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Start Learning?</h2>
            <p>Choose your preferred learning method and begin your DSA journey</p>
            <div className="cta-buttons">
              <button className="primary-btn large" onClick={() => handleNavigation('/games')}>
                Interactive Games
              </button>
              <button className="secondary-btn large" onClick={() => handleNavigation('/practice')}>
                Code Practice
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConceptsPage;