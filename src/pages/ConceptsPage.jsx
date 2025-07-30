import React from 'react';
import Navbar from '../components/Navbar';
const ConceptsPage = () => {
  const fundamentalConcepts = [
    {
      concept: "Time Complexity",
      notation: "O(n)",
      explanation: "Measures how algorithm runtime grows with input size",
      examples: ["O(1) - Constant", "O(log n) - Logarithmic", "O(n) - Linear", "O(n²) - Quadratic"],
      color: "#6366f1"
    },
    {
      concept: "Space Complexity", 
      notation: "O(n)",
      explanation: "Measures additional memory usage relative to input size",
      examples: ["In-place - O(1)", "Recursive - O(h)", "Dynamic arrays - O(n)"],
      color: "#8b5cf6"
    },
    {
      concept: "Algorithm Design",
      notation: "Paradigms",
      explanation: "Different approaches to solving computational problems",
      examples: ["Divide & Conquer", "Greedy", "Dynamic Programming", "Backtracking"],
      color: "#10b981"
    },
    {
      concept: "Data Structures",
      notation: "Organization",
      explanation: "Ways to organize and store data for efficient access and modification",
      examples: ["Arrays", "Linked Lists", "Trees", "Hash Tables"],
      color: "#f59e0b"
    },
    {
      concept: "Sorting Algorithms",
      notation: "O(n log n)",
      explanation: "Methods to arrange data in a particular order",
      examples: ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort"],
      color: "#ef4444"
    },
    {
      concept: "Graph Algorithms",
      notation: "Traversal",
      explanation: "Techniques for exploring and analyzing graph structures",
      examples: ["BFS", "DFS", "Dijkstra", "Kruskal's"],
      color: "#06b6d4"
    }
  ];

  const complexityLevels = [
    { name: "O(1)", description: "Constant Time", example: "Array access", color: "#10b981" },
    { name: "O(log n)", description: "Logarithmic Time", example: "Binary search", color: "#06b6d4" },
    { name: "O(n)", description: "Linear Time", example: "Array traversal", color: "#f59e0b" },
    { name: "O(n log n)", description: "Linearithmic Time", example: "Merge sort", color: "#8b5cf6" },
    { name: "O(n²)", description: "Quadratic Time", example: "Bubble sort", color: "#ef4444" },
    { name: "O(2ⁿ)", description: "Exponential Time", example: "Recursive fibonacci", color: "#dc2626" }
  ];

  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
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
                  onClick={() => handleNavigation(`/learn/${item.concept.toLowerCase().replace(' ', '-')}`)}
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
                        backgroundColor: level.color 
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

      <style jsx>{`
      :root {
--primary-color: #7f80baff;
--secondary-color: #8b0426;
--accent-color: #8b5cf6;
--success-color: #10b981;
--warning-color: #f59e0b;
--error-color: #ef4444;

--background: #aea2e2ff;
--surface: linear-gradient(135deg, #616576ff 0%, #322242 50%, #3f1444 100%);
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

        .concepts-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
          min-height: 100vh;
        }

        /* Page Layout */
        .concepts-page {
          // padding-top: 4rem;
        }

        /* Hero Section */
        .concepts-hero {
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

        .concepts-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .concepts-hero p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Section Headers */
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
          max-width: 600px;
          margin: 0 auto;
        }

        /* Concepts Section */
        .concepts-section {
          padding: 5rem 2rem;
          background: var(--background);
        }

        .concepts-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .concept-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .concept-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent-color);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .concept-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent-color);
        }

        .concept-card:hover::before {
          transform: scaleX(1);
        }

        .concept-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .concept-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .notation {
          background: var(--accent-color);
          color: var(--text-white);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .concept-explanation {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .concept-examples {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .example-tag {
          background: var(--background);
          border: 1px solid var(--border);
          padding: 0.25rem 0.625rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .learn-more-btn {
          background: none;
          border: none;
          color: var(--accent-color);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
        }

        .learn-more-btn:hover {
          color: var(--primary-color);
          transform: translateX(2px);
        }

        /* Complexity Section */
        .complexity-section {
          padding: 5rem 2rem;
          background: var(--surface);
        }

        .complexity-chart {
          max-width: 800px;
          margin: 0 auto;
        }

        .chart-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .chart-header h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .chart-header p {
          color: var(--text-secondary);
        }

        .complexity-levels {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .complexity-item {
          display: grid;
          grid-template-columns: 100px 1fr 200px;
          align-items: center;
          gap: 1.5rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1rem;
          transition: all 0.2s ease;
        }

        .complexity-item:hover {
          border-color: var(--level-color);
          transform: translateX(4px);
        }

        .complexity-notation {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--level-color);
          text-align: center;
        }

        .complexity-details h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .complexity-details p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .complexity-bar {
          background: var(--border);
          height: 8px;
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          transition: width 0.8s ease;
          border-radius: var(--radius-sm);
        }

        /* Learning Path */
        .learning-path {
          padding: 5rem 2rem;
          background: var(--background);
        }

        .path-container {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }

        .path-step {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          text-align: center;
          max-width: 280px;
          transition: all 0.3s ease;
        }

        .path-step:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-color);
        }

        .step-number {
          width: 3rem;
          height: 3rem;
          background: var(--primary-color);
          color: var(--text-white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
        }

        .step-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .step-content p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .step-btn {
          background: var(--primary-color);
          color: var(--text-white);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .step-btn:hover {
          background: var(--secondary-color);
          transform: translateY(-1px);
        }

        .path-connector {
          width: 3rem;
          height: 2px;
          background: var(--border);
          position: relative;
        }

        .path-connector::after {
          content: '→';
          position: absolute;
          right: -10px;
          top: -8px;
          color: var(--text-muted);
          font-size: 1.25rem;
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

          .concepts-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }

          .path-container {
            flex-direction: column;
          }

          .path-connector {
            width: 2px;
            height: 3rem;
            transform: rotate(90deg);
          }

          .path-connector::after {
            content: '↓';
            right: -8px;
            top: -10px;
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

          .concepts-hero {
            padding: 3rem 1rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .primary-btn,
          .secondary-btn {
            width: 100%;
            max-width: 280px;
          }

          .concepts-section,
          .complexity-section,
          .learning-path,
          .cta-section {
            padding: 3rem 1rem;
          }

          .concepts-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .concept-card {
            padding: 1.5rem;
          }

          .complexity-item {
            grid-template-columns: 1fr;
            gap: 1rem;
            text-align: center;
          }

          .complexity-notation {
            font-size: 1.5rem;
          }

          .path-step {
            padding: 1.5rem;
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

          .concept-card,
          .path-step {
            padding: 1.25rem;
          }

          .complexity-item {
            padding: 0.75rem;
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

export default ConceptsPage;