import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const quickStats = [
    { number: "12", label: "Interactive Games" },
    { number: "7", label: "Categories" },
    { number: "50+", label: "Algorithms" }
  ];

  const learningFeatures = [
    {
      title: 'Interactive Visualizations',
      description: 'See algorithms in action with step-by-step visual explanations'
    },
    {
      title: 'Gamified Learning',
      description: 'Master concepts through engaging games and challenges'
    },
    {
      title: 'Real-time Practice',
      description: 'Code and test algorithms in our interactive playground'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey and concept mastery'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path); // useNavigate handles routing
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home" ref={containerRef}>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
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
                <button className="primary-btn" onClick={() => handleNavigation('/learn')}>
                  Start Learning
                </button>
                <button className="secondary-btn" onClick={() => handleNavigation('/concepts')}>
                  Explore Concepts
                </button>
              </div>

              <div className="hero-stats">
                {quickStats.map((stat, index) => (
                  <div key={index} className="stat">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="algorithm-demo">
                <div className="demo-title">Binary Search Visualization</div>
                <div className="array-visualization">
                  {[1, 3, 5, 7, 9, 11, 13, 15].map((num, index) => (
                    <div
                      key={index}
                      className={`array-element ${index === 4 ? 'active' : ''}`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className="complexity-info">
                  <span>Time: O(log n)</span>
                  <span>Space: O(1)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="quick-access-section">
          <div className="section-header">
            <h2>Start Your Journey</h2>
            <p>Choose your learning path and begin mastering algorithms</p>
          </div>

          <div className="quick-access-grid">
            <div className="access-card primary" onClick={() => handleNavigation('/games')}>

              <h3>Interactive Games</h3>
              <p>Learn through engaging gameplay across 7 different categories</p>
              <div className="card-cta">
                Play Games →
              </div>
            </div>

            <div className="access-card" onClick={() => handleNavigation('/concepts')}>

              <h3>Core Concepts</h3>
              <p>Master fundamental concepts with visual explanations</p>
              <div className="card-cta">
                Learn Concepts →
              </div>
            </div>

            <div className="access-card" onClick={() => handleNavigation('/practice')}>

              <h3>Code Practice</h3>
              <p>Practice implementations in our interactive playground</p>
              <div className="card-cta">
                Start Coding →
              </div>
            </div>
          </div>
        </section>
        {/* Learning Features */}
        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose DSAGames?</h2>
            <p>Modern tools and methodologies for effective learning</p>
          </div>
          
          <div className="features-grid">
            {learningFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Master DSA?</h2>
            <p>Join thousands of students building strong algorithmic thinking skills</p>
            <div className="cta-buttons">
              <button className="primary-btn large" onClick={() => handleNavigation('/games')}>
                Start with Games
              </button>
              <button className="secondary-btn large" onClick={() => handleNavigation('/concepts')}>
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

        .home-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        /* Main Container */
        .home {
           padding-top: 4rem;
        }

        /* Hero Section */
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #8db5ddff 0%, #f6f7f8ff 100%);
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
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

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .highlight {
          color: var(--primary-color);
          position: relative;
        }

        .highlight::after {
          content: '';
          position: absolute;
          bottom: 0.1em;
          left: 0;
          width: 100%;
          height: 0.1em;
          background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
          opacity: 0.3;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .algorithm-demo {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-xl);
        }

        .demo-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .array-visualization {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .array-element {
          width: 3rem;
          height: 3rem;
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .array-element.active {
          background: var(--primary-color);
          color: var(--text-white);
          border-color: var(--primary-color);
          transform: scale(1.1);
        }

        .complexity-info {
          display: flex;
          justify-content: space-around;
          gap: 1rem;
        }

        .complexity-info span {
          background: var(--surface);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
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

        /* Quick Access Section */
        .quick-access-section {
          padding: 5rem 2rem;
          background: var(--surface);
        }

        .quick-access-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .access-card {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .access-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .access-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-color);
        }

        .access-card:hover::before {
          transform: scaleX(1);
        }

        .access-card.primary {
          background: var(--gradient-primary);
          color: var(--text-white);
          border: none;
        }

        .access-card.primary h3,
        .access-card.primary p {
          color: var(--text-white);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .access-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .access-card p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .card-cta {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .access-card.primary .card-cta {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.2);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          backdrop-filter: blur(10px);
        }

        .card-cta:hover {
          transform: translateX(4px);
        }

        .access-card.primary .card-cta:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Features Section */
        .features-section {
          padding: 5rem 2rem;
          // background: var(--background);
          background:  linear-gradient(135deg, #8db5ddff 0%, #f6f7f8ff 100%);
        }

        .features-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem 1.5rem;
          border-radius: var(--radius-lg);
          transition: all 0.2s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .feature-card h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
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
          transform: translateY(-2px);
        }

        /* Button Styles */
        .primary-btn {
          background: var(--primary-color);
          color: var(--text-white);
          padding: 0.875rem 1.75rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
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

        /* Responsive Design */
        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 1.5rem;
          }

          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .hero-stats {
            justify-content: center;
          }

          .quick-access-grid,
          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

          .hero {
            padding: 3rem 1rem;
            min-height: auto;
          }

          .hero-actions {
            flex-direction: column;
          }

          .primary-btn,
          .secondary-btn {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }

          .hero-stats {
            gap: 1.5rem;
          }

          .algorithm-demo {
            padding: 1.5rem;
          }

          .array-element {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 0.9rem;
          }

          .quick-access-section,
          .features-section,
          .cta-section {
            padding: 3rem 1rem;
          }

          .quick-access-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .access-card {
            padding: 2rem;
          }

          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
          }

          .feature-card {
            padding: 1.5rem 1rem;
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
          .nav-links {
            gap: 0.5rem;
          }

          .nav-links a:not(.nav-cta) {
            display: none;
          }

          .hero-badge {
            font-size: 0.75rem;
            padding: 0.3rem 0.6rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .access-card {
            padding: 1.5rem;
          }
        }

        /* Focus styles for accessibility */
        button:focus-visible,
        a:focus-visible,
        .primary-btn:focus-visible,
        .secondary-btn:focus-visible {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Home;
