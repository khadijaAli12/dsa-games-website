import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './BitmaskStyles.scss';

const BitmaskDungeon = () => {
  const [keys, setKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(0);
  const [target, setTarget] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isSolving, setIsSolving] = useState(false);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numKeys = Math.min(8, 3 + level);
    const newKeys = Array.from({ length: numKeys }, (_, i) => Math.pow(2, i));
    const newTarget = Math.floor(Math.random() * (Math.pow(2, numKeys) - 1)) + 1;
    
    setKeys(newKeys);
    setTarget(newTarget);
    setSelectedKeys(0);
    setIsSolving(false);
  };

  const toggleKey = (keyValue) => {
    if (isSolving) return;
    setSelectedKeys(prev => prev ^ keyValue);
  };

  const solveLevel = () => {
    setIsSolving(true);
    const solution = findSubsetSum(keys, target);
    animateSolution(solution);
  };

  const findSubsetSum = (arr, target) => {
    const n = arr.length;
    const solutions = [];
    
    for (let mask = 0; mask < (1 << n); mask++) {
      let sum = 0;
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          sum += arr[i];
        }
      }
      if (sum === target) {
        solutions.push(mask);
      }
    }
    
    return solutions[0] || 0;
  };

  const animateSolution = (solution) => {
    let currentMask = 0;
    const interval = setInterval(() => {
      if (currentMask <= solution) {
        setSelectedKeys(currentMask);
        currentMask++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (selectedKeys === target) {
            setScore(prev => prev + level * 10);
            setLevel(prev => prev + 1);
          }
          setIsSolving(false);
        }, 1000);
      }
    }, 200);
  };

  const checkSolution = () => {
    if (selectedKeys === target) {
      setScore(prev => prev + level * 10);
      setLevel(prev => prev + 1);
    }
  };

  const getBinaryRepresentation = (num) => {
    return num.toString(2).padStart(8, '0');
  };

  return (
    <div className="bitmask-dungeon">
      <Navbar />
      <h2>🔑 Bitmask Dungeon</h2>
      
      <div className="game-info">
        <div className="level-info">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
        </div>
        
        <div className="target-display">
          <h3>Target: {target}</h3>
          <div className="binary-target">
            Binary: {getBinaryRepresentation(target)}
          </div>
        </div>
      </div>

      <div className="keys-container">
        <h3>Available Keys (Click to toggle):</h3>
        <div className="keys-grid">
          {keys.map((key, index) => (
            <div
              key={index}
              className={`key ${selectedKeys & key ? 'selected' : ''}`}
              onClick={() => toggleKey(key)}
            >
              <div className="key-value">{key}</div>
              <div className="key-binary">{getBinaryRepresentation(key)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="selected-sum">
        <h3>Selected Sum: {selectedKeys}</h3>
        <div className="binary-sum">
          Binary: {getBinaryRepresentation(selectedKeys)}
        </div>
        <div className={`result ${selectedKeys === target ? 'correct' : 'incorrect'}`}>
          {selectedKeys === target ? '✅ Correct!' : selectedKeys > target ? '❌ Too High' : '❌ Too Low'}
        </div>
      </div>

      <div className="controls">
        <button onClick={checkSolution} disabled={isSolving}>
          Check Solution
        </button>
        <button onClick={solveLevel} disabled={isSolving}>
          Show Solution
        </button>
        <button onClick={generateLevel} disabled={isSolving}>
          New Level
        </button>
      </div>

      <div className="explanation">
        <h3>How Bitmask Works:</h3>
        <p>
          Each key represents a bit position. When you select keys, you're creating a bitmask.
          The sum of selected keys should equal the target. This teaches subset sum problems
          using bit manipulation for efficient solutions.
        </p>
      </div>
    </div>
  );
};

export default BitmaskDungeon; 