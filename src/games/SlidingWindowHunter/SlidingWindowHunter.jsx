import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './SlidingWindowHunterStyles.scss';

const SlidingWindowHunter = () => {
  const [array, setArray] = useState([]);
  const [windowSize, setWindowSize] = useState(3);
  const [currentWindow, setCurrentWindow] = useState([0, windowSize - 1]);
  const [result, setResult] = useState(null);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    generateArray();
  }, [level]);

  useEffect(() => {
    setCurrentWindow([0, windowSize - 1]);
  }, [windowSize]);

  const generateArray = () => {
    const size = Math.min(12, 6 + Math.floor(level / 2));
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 20) + 1);
    setArray(newArray);
    setCurrentWindow([0, windowSize - 1]);
    setResult(null);
    setIsAnimating(false);
  };

  const slideWindow = (direction) => {
    if (isAnimating) return;
    
    const [start, end] = currentWindow;
    let newStart = start;
    let newEnd = end;
    
    if (direction === 'right' && end < array.length - 1) {
      newStart = start + 1;
      newEnd = end + 1;
    } else if (direction === 'left' && start > 0) {
      newStart = start - 1;
      newEnd = end - 1;
    }
    
    if (newStart !== start) {
      setCurrentWindow([newStart, newEnd]);
    }
  };

  const calculateWindowSum = () => {
    const [start, end] = currentWindow;
    return array.slice(start, end + 1).reduce((sum, val) => sum + val, 0);
  };

  const calculateWindowMax = () => {
    const [start, end] = currentWindow;
    return Math.max(...array.slice(start, end + 1));
  };

  const calculateWindowMin = () => {
    const [start, end] = currentWindow;
    return Math.min(...array.slice(start, end + 1));
  };

  const findMaxSum = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    let maxSum = -Infinity;
    let maxWindow = [0, windowSize - 1];
    
    for (let i = 0; i <= array.length - windowSize; i++) {
      const sum = array.slice(i, i + windowSize).reduce((s, val) => s + val, 0);
      if (sum > maxSum) {
        maxSum = sum;
        maxWindow = [i, i + windowSize - 1];
      }
    }
    
    animateMaxSum(maxWindow, maxSum);
  };

  const animateMaxSum = (maxWindow, maxSum) => {
    let step = 0;
    const totalSteps = array.length - windowSize + 1;
    
    const interval = setInterval(() => {
      if (step < totalSteps) {
        setCurrentWindow([step, step + windowSize - 1]);
        step++;
      } else {
        clearInterval(interval);
        setCurrentWindow(maxWindow);
        setResult({ type: 'maxSum', value: maxSum, window: maxWindow });
        setScore(prev => prev + level * 10);
        setTimeout(() => {
          setIsAnimating(false);
          setLevel(prev => prev + 1);
        }, 1000);
      }
    }, 500);
  };

  const getWindowElements = () => {
    const [start, end] = currentWindow;
    return array.slice(start, end + 1);
  };

  return (
    <div className="sliding-window-hunter">
      <Navbar />
      <h2>🧩 Sliding Window Hunter</h2>
      
      <div className="game-info">
        <div className="stats">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
        </div>
        
        <div className="window-controls">
          <label>
            Window Size:
            <select 
              value={windowSize} 
              onChange={(e) => setWindowSize(parseInt(e.target.value))}
              disabled={isAnimating}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
        </div>
      </div>

      <div className="array-section">
        <h3>Array:</h3>
        <div className="array-display">
          {array.map((value, index) => {
            const [start, end] = currentWindow;
            const isInWindow = index >= start && index <= end;
            
            return (
              <div
                key={index}
                className={`array-element ${isInWindow ? 'in-window' : ''}`}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>

      <div className="window-section">
        <h3>Current Window:</h3>
        <div className="window-display">
          {getWindowElements().map((value, index) => (
            <div key={index} className="window-element">
              {value}
            </div>
          ))}
        </div>
        
        <div className="window-stats">
          <div className="stat">
            <span>Sum:</span>
            <span>{calculateWindowSum()}</span>
          </div>
          <div className="stat">
            <span>Max:</span>
            <span>{calculateWindowMax()}</span>
          </div>
          <div className="stat">
            <span>Min:</span>
            <span>{calculateWindowMin()}</span>
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => slideWindow('left')} disabled={isAnimating}>
          ← Slide Left
        </button>
        <button onClick={() => slideWindow('right')} disabled={isAnimating}>
          Slide Right →
        </button>
        <button onClick={findMaxSum} disabled={isAnimating}>
          Find Max Sum
        </button>
        <button onClick={generateArray} disabled={isAnimating}>
          New Array
        </button>
      </div>

      <div className="result-section">
        {result && (
          <div className="result-display">
            <h3>Result:</h3>
            <p>Maximum Sum: {result.value}</p>
            <p>Window: [{result.window[0]}, {result.window[1]}]</p>
            <p>Elements: {array.slice(result.window[0], result.window[1] + 1).join(', ')}</p>
          </div>
        )}
      </div>

      <div className="explanation">
        <h3>Sliding Window Technique:</h3>
        <ul>
          <li><strong>Fixed Size:</strong> Window maintains constant size while sliding</li>
          <li><strong>Efficient:</strong> Avoids recalculating overlapping elements</li>
          <li><strong>Applications:</strong> Maximum/minimum subarray sums, pattern matching</li>
          <li><strong>Time Complexity:</strong> O(n) instead of O(n*k) for brute force</li>
        </ul>
      </div>
    </div>
  );
};

export default SlidingWindowHunter; 