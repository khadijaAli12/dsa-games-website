import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About DSA Games</h1>
        <p>Making algorithm learning fun and interactive</p>
      </div>

      <div className="about-content">
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            DSA Games is dedicated to making Data Structures and Algorithms learning 
            accessible, engaging, and effective through interactive visualizations and games. 
            We believe that learning complex concepts should be both educational and enjoyable.
          </p>
        </div>

        <div className="features-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Interactive Games</h3>
              <p>Learn algorithms through hands-on gameplay experiences</p>
            </div>
            <div className="feature-item">
              <h3>Visual Learning</h3>
              <p>See algorithms in action with step-by-step visualizations</p>
            </div>
            <div className="feature-item">
              <h3>Educational Content</h3>
              <p>Comprehensive explanations and learning resources</p>
            </div>
            <div className="feature-item">
              <h3>Progressive Learning</h3>
              <p>Start simple and advance to complex algorithms</p>
            </div>
          </div>
        </div>

        <div className="algorithms-section">
          <h2>Algorithms Covered</h2>
          <div className="algorithms-grid">
            <div className="algorithm-category">
              <h3>Sorting Algorithms</h3>
              <ul>
                <li>Bubble Sort</li>
                <li>Quick Sort</li>
                <li>Merge Sort</li>
                <li>Insertion Sort</li>
              </ul>
            </div>
            <div className="algorithm-category">
              <h3>Search Algorithms</h3>
              <ul>
                <li>Linear Search</li>
                <li>Binary Search</li>
                <li>Depth-First Search</li>
                <li>Breadth-First Search</li>
              </ul>
            </div>
            <div className="algorithm-category">
              <h3>Graph Algorithms</h3>
              <ul>
                <li>Dijkstra's Algorithm</li>
                <li>Minimum Spanning Tree</li>
                <li>Topological Sort</li>
                <li>Cycle Detection</li>
              </ul>
            </div>
            <div className="algorithm-category">
              <h3>Tree Algorithms</h3>
              <ul>
                <li>Tree Traversal</li>
                <li>Binary Search Trees</li>
                <li>AVL Trees</li>
                <li>Heap Operations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Why Choose DSA Games?</h2>
          <div className="benefits-list">
            <div className="benefit">
              <h4>🎯 Practical Learning</h4>
              <p>Apply theoretical knowledge through interactive exercises</p>
            </div>
            <div className="benefit">
              <h4>⏱️ Time Efficient</h4>
              <p>Learn faster with visual aids and hands-on practice</p>
            </div>
            <div className="benefit">
              <h4>🧠 Better Retention</h4>
              <p>Remember concepts longer through active engagement</p>
            </div>
            <div className="benefit">
              <h4>🎓 Interview Ready</h4>
              <p>Prepare for technical interviews with practical experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 