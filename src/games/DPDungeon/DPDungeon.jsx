import React, { useState, useEffect } from 'react';
import './DPDungeonStyles.scss';

const DPDungeon = () => {
  const [grid, setGrid] = useState([]);
  const [playerPos, setPlayerPos] = useState([0, 0]);
  const [energy, setEnergy] = useState(100);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [optimalPath, setOptimalPath] = useState([]);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const size = Math.min(6, 4 + Math.floor(level / 2));
    const newGrid = Array(size).fill().map(() => 
      Array(size).fill().map(() => ({
        value: Math.floor(Math.random() * 10) + 1,
        cost: Math.floor(Math.random() * 5) + 1
      }))
    );
    
    setGrid(newGrid);
    setPlayerPos([0, 0]);
    setEnergy(100);
    setOptimalPath([]);
    setIsAnimating(false);
  };

  const calculateOptimalPath = () => {
    const size = grid.length;
    const dp = Array(size).fill().map(() => Array(size).fill(0));
    const path = Array(size).fill().map(() => Array(size).fill(null));
    
    // Initialize first row and column
    dp[0][0] = grid[0][0].value;
    for (let i = 1; i < size; i++) {
      dp[0][i] = dp[0][i-1] + grid[0][i].value;
      path[0][i] = [0, i-1];
    }
    for (let i = 1; i < size; i++) {
      dp[i][0] = dp[i-1][0] + grid[i][0].value;
      path[i][0] = [i-1, 0];
    }
    
    // Fill DP table
    for (let i = 1; i < size; i++) {
      for (let j = 1; j < size; j++) {
        const fromTop = dp[i-1][j];
        const fromLeft = dp[i][j-1];
        
        if (fromTop > fromLeft) {
          dp[i][j] = fromTop + grid[i][j].value;
          path[i][j] = [i-1, j];
        } else {
          dp[i][j] = fromLeft + grid[i][j].value;
          path[i][j] = [i, j-1];
        }
      }
    }
    
    // Reconstruct path
    const optimalPath = [];
    let current = [size-1, size-1];
    while (current) {
      optimalPath.unshift(current);
      current = path[current[0]][current[1]];
    }
    
    return optimalPath;
  };

  const showOptimalPath = () => {
    const path = calculateOptimalPath();
    setOptimalPath(path);
    
    setTimeout(() => {
      setOptimalPath([]);
    }, 3000);
  };

  const movePlayer = (direction) => {
    if (isAnimating) return;
    
    const [row, col] = playerPos;
    let newRow = row;
    let newCol = col;
    
    switch (direction) {
      case 'right':
        if (col < grid.length - 1) newCol = col + 1;
        break;
      case 'down':
        if (row < grid.length - 1) newRow = row + 1;
        break;
      default:
        return;
    }
    
    if (newRow !== row || newCol !== col) {
      const cellCost = grid[newRow][newCol].cost;
      const cellValue = grid[newRow][newCol].value;
      
      if (energy >= cellCost) {
        setIsAnimating(true);
        setPlayerPos([newRow, newCol]);
        setEnergy(prev => prev - cellCost);
        setScore(prev => prev + cellValue);
        
        setTimeout(() => {
          setIsAnimating(false);
          
          // Check if reached end
          if (newRow === grid.length - 1 && newCol === grid.length - 1) {
            setLevel(prev => prev + 1);
          }
        }, 300);
      }
    }
  };

  const isInOptimalPath = (row, col) => {
    return optimalPath.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="dp-dungeon">
      <h2>📦 DP Dungeon</h2>
      
      <div className="game-info">
        <div className="stats">
          <span>Level: {level}</span>
          <span>Energy: {energy}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((cell, colIndex) => {
                const isPlayer = rowIndex === playerPos[0] && colIndex === playerPos[1];
                const isOptimal = isInOptimalPath(rowIndex, colIndex);
                
                return (
                  <div
                    key={colIndex}
                    className={`grid-cell ${
                      isPlayer ? 'player' :
                      isOptimal ? 'optimal' : 'normal'
                    }`}
                  >
                    <div className="cell-value">{cell.value}</div>
                    <div className="cell-cost">⚡{cell.cost}</div>
                    {isPlayer && <div className="player-marker">👤</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button onClick={() => movePlayer('right')} disabled={isAnimating}>
          Move Right →
        </button>
        <button onClick={() => movePlayer('down')} disabled={isAnimating}>
          Move Down ↓
        </button>
        <button onClick={showOptimalPath} disabled={isAnimating}>
          Show Optimal Path
        </button>
        <button onClick={generateLevel} disabled={isAnimating}>
          New Level
        </button>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color player"></div>
          <span>Player</span>
        </div>
        <div className="legend-item">
          <div className="legend-color optimal"></div>
          <span>Optimal Path</span>
        </div>
        <div className="legend-item">
          <div className="legend-color normal"></div>
          <span>Normal Cell</span>
        </div>
      </div>

      <div className="explanation">
        <h3>Dynamic Programming Strategy:</h3>
        <p>
          Each cell shows a value (points) and cost (energy). You must reach the bottom-right
          with maximum points while managing your energy. The optimal path uses dynamic programming
          to find the best route considering both values and costs.
        </p>
      </div>
    </div>
  );
};

export default DPDungeon; 