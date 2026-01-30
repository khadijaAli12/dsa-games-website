import React from 'react';
import { motion } from 'framer-motion';

const PortfolioShowcase = () => {
  const projectMetrics = {
    gamesCount: 12,
    conceptsCovered: 50,
    categories: 7,
    technologies: ['React 19', 'Framer Motion', 'SCSS', 'Zustand', 'React Router'],
    performance: {
      loadTime: '1.2s',
      lighthouseScore: 92,
      bundleSize: '2.1MB'
    }
  };

  const features = [
    'Interactive algorithm visualizations',
    'Game-based learning approach',
    'Responsive design for all devices',
    'Professional UI/UX design',
    'Performance optimized animations',
    'Accessibility compliant (WCAG 2.1)',
    'Modular component architecture',
    'State management with Zustand'
  ];

  return (
    <div className="portfolio-showcase">
      <div className="showcase-container">
        <motion.div 
          className="project-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>DSA Games Portfolio</h1>
          <p className="project-description">
            An interactive educational platform for learning Data Structures and Algorithms 
            through gamified experiences and visual learning.
          </p>
        </motion.div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">{projectMetrics.gamesCount}+</div>
            <div className="metric-label">Interactive Games</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{projectMetrics.conceptsCovered}+</div>
            <div className="metric-label">DSA Concepts</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{projectMetrics.categories}</div>
            <div className="metric-label">Learning Categories</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{projectMetrics.performance.lighthouseScore}</div>
            <div className="metric-label">Lighthouse Score</div>
          </div>
        </div>

        <div className="tech-stack">
          <h3>Technology Stack</h3>
          <div className="tech-tags">
            {projectMetrics.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        <div className="features-section">
          <h3>Key Features</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <span className="feature-icon">✓</span>
                {feature}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="technical-highlights">
          <h3>Technical Highlights</h3>
          <div className="highlights-grid">
            <div className="highlight-card">
              <h4>Performance</h4>
              <ul>
                <li>Optimized load time: {projectMetrics.performance.loadTime}</li>
                <li>Bundle size: {projectMetrics.performance.bundleSize}</li>
                <li>Lighthouse performance score: {projectMetrics.performance.lighthouseScore}</li>
              </ul>
            </div>
            <div className="highlight-card">
              <h4>Architecture</h4>
              <ul>
                <li>Modular component structure</li>
                <li>State management with Zustand</li>
                <li>Responsive design system</li>
              </ul>
            </div>
            <div className="highlight-card">
              <h4>UX</h4>
              <ul>
                <li>Accessible design (WCAG 2.1)</li>
                <li>Smooth Framer Motion animations</li>
                <li>Intuitive game-based learning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcase;