import React, { useState, useEffect } from 'react';
import './MazeStyles.scss';

const MazeEscape = () => {
  const [maze, setMaze] = useState([]);
  const [solution, setSolution] = useState([]);
  const [isSolving, setIsSolving] = useState(false);
  const [mazeSize, setMazeSize] = useState(8);

  useEffect(() => {
    generateMaze();
  }, [mazeSize]);

  const generateMaze = () => {
    const newMaze = Array(mazeSize).fill().map(() => 
      Array(mazeSize).fill().map(() => Math.random() > 0.3 ? 1 : 0)
    );
    
    // Set start and end points
    newMaze[0][0] = 1; // Start
    newMaze[mazeSize - 1][mazeSize - 1] = 1; // End
    
    setMaze(newMaze);
    setSolution([]);
    setIsSolving(false);
  };

  const solveMaze = () => {
    setIsSolving(true);
    const path = findPath([0, 0], [mazeSize - 1, mazeSize - 1]);
    animateSolution(path);
  };

  const findPath = (start, end) => {
    const visited = Array(mazeSize).fill().map(() => Array(mazeSize).fill(false));
    const path = [];
    
    const backtrack = (row, col) => {
      if (row < 0 || row >= mazeSize || col < 0 || col >= mazeSize) return false;
      if (maze[row][col] === 0 || visited[row][col]) return false;
      
      visited[row][col] = true;
      path.push([row, col]);
      
      if (row === end[0] && col === end[1]) return true;
      
      // Try all directions: right, down, left, up
      const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      
      for (const [dr, dc] of directions) {
        if (backtrack(row + dr, col + dc)) return true;
      }
      
      path.pop();
      return false;
    };
    
    backtrack(start[0], start[1]);
    return path;
  };

  const animateSolution = (path) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < path.length) {
        setSolution(path.slice(0, index + 1));
        index++;
      } else {
        setIsSolving(false);
        clearInterval(interval);
      }
    }, 200);
  };

  const isInSolution = (row, col) => {
    return solution.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="maze-escape">
      <h2>Maze Escape</h2>
      <div className="controls">
        <select 
          value={mazeSize} 
          onChange={(e) => setMazeSize(Number(e.target.value))}
          disabled={isSolving}
        >
          <option value={6}>6x6</option>
          <option value={8}>8x8</option>
          <option value={10}>10x10</option>
          <option value={12}>12x12</option>
        </select>
        <button onClick={generateMaze} disabled={isSolving}>
          New Maze
        </button>
        <button onClick={solveMaze} disabled={isSolving}>
          Solve Maze
        </button>
      </div>
      
      <div className="maze-container">
        <div className="maze">
          {maze.map((row, rowIndex) => (
            <div key={rowIndex} className="maze-row">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`maze-cell ${
                    cell === 0 ? 'wall' : 
                    rowIndex === 0 && colIndex === 0 ? 'start' :
                    rowIndex === mazeSize - 1 && colIndex === mazeSize - 1 ? 'end' :
                    isInSolution(rowIndex, colIndex) ? 'path' : 'empty'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color start"></div>
          <span>Start</span>
        </div>
        <div className="legend-item">
          <div className="legend-color end"></div>
          <span>End</span>
        </div>
        <div className="legend-item">
          <div className="legend-color path"></div>
          <span>Solution Path</span>
        </div>
        <div className="legend-item">
          <div className="legend-color wall"></div>
          <span>Wall</span>
        </div>
      </div>
      
      <div className="info">
        <p>Status: {isSolving ? 'Solving...' : 'Ready'}</p>
        <p>Path Length: {solution.length}</p>
      </div>
    </div>
  );
};

export default MazeEscape; 