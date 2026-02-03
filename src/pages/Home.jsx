import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const quickStats = [
    { number: "18", label: "Interactive Games" },
    { number: "10", label: "Learning Paths" },
    { number: "100+", label: "Coding Challenges" }
  ];

  const learningFeatures = [
    {
      title: 'Interactive Visualizations',
      description: 'Visualize algorithms in action with step-by-step animated demonstrations'
    },
    {
      title: 'Gamified Learning',
      description: 'Master concepts through engaging challenges and interactive games'
    },
    {
      title: 'Real-time Practice',
      description: 'Implement and test algorithms in our live coding playground'
    },
    {
      title: 'Progress Tracking',
      description: 'Track your learning journey and measure concept mastery'
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
                Master computer science fundamentals through interactive visualizations,
                gamified learning experiences, and hands-on coding challenges.
              </p>

              <div className="hero-actions">
                <button className="primary-btn" onClick={() => handleNavigation('/concepts')}>
                  Start Learning
                </button>
                <button className="secondary-btn" onClick={() => handleNavigation('/games')}>
                  Explore Games
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
                  {[2, 5, 8, 12, 16, 23, 38, 45].map((num, index) => (
                    <div
                      key={index}
                      className={`array-element ${index === 5 ? 'active' : ''}`}
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
              <p>Master concepts through engaging gameplay across multiple learning paths</p>
              <div className="card-cta">
                Play Games →
              </div>
            </div>

            <div className="access-card" onClick={() => handleNavigation('/concepts')}>

              <h3>Core Concepts</h3>
              <p>Deep dive into algorithms and data structures with detailed explanations</p>
              <div className="card-cta">
                Learn Concepts →
              </div>
            </div>

            <div className="access-card" onClick={() => handleNavigation('/practice')}>

              <h3>Coding Practice</h3>
              <p>Solve challenges and implement algorithms in our interactive playground</p>
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
            <h2>Start Your Learning Journey</h2>
            <p>Join thousands of developers mastering algorithms and data structures</p>
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
          background: linear-gradient(135deg, var(--primary-100) 0%, var(--neutral-50) 100%);
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

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
        }

        .highlight {
          color: var(--primary-600);
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
          margin-bottom: var(--spacing-xl);
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-2xl);
        }

        .hero-stats {
          display: flex;
          gap: var(--spacing-xl);
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-number {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary-600);
          margin-bottom: var(--spacing-xs);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .algorithm-demo {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          box-shadow: var(--shadow-xl);
        }

        .demo-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--spacing-lg);
          text-align: center;
        }

        .array-visualization {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: center;
          margin-bottom: var(--spacing-lg);
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
          transition: all var(--transition-normal);
        }

        .array-element.active {
          background: var(--primary-500);
          color: var(--text-inverse);
          border-color: var(--primary-500);
          transform: scale(1.1);
        }

        .complexity-info {
          display: flex;
          justify-content: space-around;
          gap: var(--spacing-md);
        }

        .complexity-info span {
          background: var(--surface);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        /* Section Headers */
        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-2xl);
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
          max-width: 600px;
          margin: 0 auto;
        }

        /* Quick Access Section */
        .quick-access-section {
          padding: var(--spacing-2xl) var(--spacing-lg);
          background: var(--surface);
        }

        .quick-access-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-lg);
        }

        .access-card {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          text-align: center;
          transition: all var(--transition-normal);
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
          transform: translateY(calc(-1 * var(--spacing-sm)));
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-500);
        }

        .access-card:hover::before {
          transform: scaleX(1);
        }

        .access-card.primary {
          background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
          color: var(--text-inverse);
          border: none;
        }

        .access-card.primary h3,
        .access-card.primary p {
          color: var(--text-inverse);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .access-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-md);
          color: var(--text-primary);
        }

        .access-card p {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-lg);
          line-height: 1.6;
        }

        .card-cta {
          color: var(--primary-500);
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all var(--transition-fast);
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
        }

        .access-card.primary .card-cta {
          color: var(--text-inverse);
          background: rgba(255, 255, 255, 0.2);
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-md);
          backdrop-filter: blur(10px);
        }

        .card-cta:hover {
          transform: translateX(var(--spacing-sm));
        }

        .access-card.primary .card-cta:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(calc(-1 * var(--spacing-xs)));
        }

        /* Features Section */
        .features-section {
          padding: var(--spacing-2xl) var(--spacing-lg);
          background:  linear-gradient(135deg, var(--primary-100) 0%, var(--neutral-50) 100%);
        }

        .features-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--spacing-lg);
        }

        .feature-card {
          text-align: center;
          padding: var(--spacing-lg) var(--spacing-md);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
        }

        .feature-card:hover {
          transform: translateY(calc(-1 * var(--spacing-xs)));
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
          margin-bottom: var(--spacing-sm);
        }

        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
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
          margin-bottom: var(--spacing-md);
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

        .cta-buttons .primary-btn {
          background: var(--text-inverse);
          color: var(--primary-600);
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
          background: var(--primary-600);
          color: var(--text-inverse);
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-md);
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all var(--transition-fast);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
        }

        .primary-btn:hover {
          background: var(--primary-700);
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
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all var(--transition-fast);
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
