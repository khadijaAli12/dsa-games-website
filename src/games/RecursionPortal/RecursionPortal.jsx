import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './RecursionPortalStyles.scss';

const RecursionPortal = () => {
  const [recursionDepth, setRecursionDepth] = useState(0);
  const [maxDepth, setMaxDepth] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [level, setLevel] = useState(1);
  const [portalHistory, setPortalHistory] = useState([]);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const newMaxDepth = Math.min(8, 3 + Math.floor(level / 2));
    setMaxDepth(newMaxDepth);
    setRecursionDepth(0);
    setPortalHistory([]);
    setIsAnimating(false);
  };

  const enterPortal = () => {
    if (isAnimating || recursionDepth >= maxDepth) return;
    
    setIsAnimating(true);
    const newDepth = recursionDepth + 1;
    setRecursionDepth(newDepth);
    setPortalHistory(prev => [...prev, newDepth]);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const exitPortal = () => {
    if (isAnimating || recursionDepth <= 0) return;
    
    setIsAnimating(true);
    const newDepth = recursionDepth - 1;
    setRecursionDepth(newDepth);
    
    setTimeout(() => {
      setIsAnimating(false);
      if (newDepth === 0) {
        setLevel(prev => prev + 1);
      }
    }, 500);
  };

  const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const getPortalColor = (depth) => {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
      '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
    ];
    return colors[depth % colors.length];
  };

  const getRecursionInfo = () => {
    const factorialResult = factorial(recursionDepth);
    const fibonacciResult = fibonacci(recursionDepth);
    
    return {
      factorial: factorialResult,
      fibonacci: fibonacciResult,
      depth: recursionDepth
    };
  };

  return (
    <div className="recursion-portal">
      <Navbar />
      <h2>🔄 Recursion Portal</h2>
      
      <div className="game-info">
        <div className="stats">
          <span>Level: {level}</span>
          <span>Max Depth: {maxDepth}</span>
          <span>Current Depth: {recursionDepth}</span>
        </div>
      </div>

      <div className="portal-container">
        <div className="portal-stack">
          {Array.from({ length: recursionDepth + 1 }, (_, index) => (
            <div
              key={index}
              className="portal-level"
              style={{
                backgroundColor: getPortalColor(index),
                zIndex: index + 1,
                transform: `scale(${1 - index * 0.1})`,
                opacity: 1 - index * 0.1
              }}
            >
              <div className="portal-content">
                <h3>Portal Level {index}</h3>
                <div className="recursion-data">
                  <p>Depth: {index}</p>
                  <p>Factorial({index}) = {factorial(index)}</p>
                  <p>Fibonacci({index}) = {fibonacci(index)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button 
          onClick={enterPortal} 
          disabled={isAnimating || recursionDepth >= maxDepth}
          className="enter-btn"
        >
          Enter Portal (Go Deeper)
        </button>
        <button 
          onClick={exitPortal} 
          disabled={isAnimating || recursionDepth <= 0}
          className="exit-btn"
        >
          Exit Portal (Go Back)
        </button>
        <button onClick={generateLevel} disabled={isAnimating}>
          New Level
        </button>
      </div>

      <div className="recursion-info">
        <h3>Current Recursion State:</h3>
        <div className="recursion-stats">
          <div className="stat">
            <span>Depth:</span>
            <span>{getRecursionInfo().depth}</span>
          </div>
          <div className="stat">
            <span>Factorial:</span>
            <span>{getRecursionInfo().factorial}</span>
          </div>
          <div className="stat">
            <span>Fibonacci:</span>
            <span>{getRecursionInfo().fibonacci}</span>
          </div>
        </div>
      </div>

      <div className="portal-history">
        <h3>Portal Journey:</h3>
        <div className="history-path">
          {portalHistory.map((depth, index) => (
            <span key={index} className="history-step">
              Level {depth}
              {index < portalHistory.length - 1 ? ' → ' : ''}
            </span>
          ))}
        </div>
      </div>

      <div className="explanation">
        <h3>Recursion Concepts:</h3>
        <ul>
          <li><strong>Base Case:</strong> When depth = 0, recursion stops</li>
          <li><strong>Recursive Case:</strong> Each portal call creates a new level</li>
          <li><strong>Call Stack:</strong> Each portal level represents a function call</li>
          <li><strong>Backtracking:</strong> Exiting portals returns to previous levels</li>
        </ul>
      </div>
    </div>
  );
};

export default RecursionPortal; 