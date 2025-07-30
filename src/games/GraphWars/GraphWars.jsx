import React, { useState, useEffect } from 'react';
import './GraphWarsStyles.scss';

const GraphWars = () => {
  const [graph, setGraph] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [path, setPath] = useState([]);
  const [visited, setVisited] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateGraph();
  }, [level]);

  const generateGraph = () => {
    const size = Math.min(8, 4 + Math.floor(level / 2));
    const newGraph = Array(size).fill().map(() => 
      Array(size).fill().map(() => Math.random() > 0.3 ? 1 : 0)
    );
    
    // Ensure start and end are connected
    newGraph[0][0] = 1;
    newGraph[size - 1][size - 1] = 1;
    
    setGraph(newGraph);
    setStart(0);
    setEnd(size * size - 1);
    setPath([]);
    setVisited([]);
    setIsRunning(false);
  };

  const getNeighbors = (node, size) => {
    const row = Math.floor(node / size);
    const col = node % size;
    const neighbors = [];
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        if (graph[newRow][newCol] === 1) {
          neighbors.push(newRow * size + newCol);
        }
      }
    }
    
    return neighbors;
  };

  const bfs = (start, end, size) => {
    const queue = [[start, [start]]];
    const visited = new Set();
    
    while (queue.length > 0) {
      const [current, path] = queue.shift();
      
      if (current === end) return path;
      if (visited.has(current)) continue;
      
      visited.add(current);
      
      for (const neighbor of getNeighbors(current, size)) {
        if (!visited.has(neighbor)) {
          queue.push([neighbor, [...path, neighbor]]);
        }
      }
    }
    
    return [];
  };

  const dfs = (start, end, size) => {
    const visited = new Set();
    
    const dfsHelper = (current, path) => {
      if (current === end) return path;
      if (visited.has(current)) return null;
      
      visited.add(current);
      
      for (const neighbor of getNeighbors(current, size)) {
        const result = dfsHelper(neighbor, [...path, neighbor]);
        if (result) return result;
      }
      
      return null;
    };
    
    return dfsHelper(start, [start]) || [];
  };

  const dijkstra = (start, end, size) => {
    const distances = Array(size * size).fill(Infinity);
    const previous = Array(size * size).fill(null);
    const queue = [];
    
    distances[start] = 0;
    queue.push([0, start]);
    
    while (queue.length > 0) {
      queue.sort((a, b) => a[0] - b[0]);
      const [dist, current] = queue.shift();
      
      if (current === end) break;
      if (dist > distances[current]) continue;
      
      for (const neighbor of getNeighbors(current, size)) {
        const newDist = dist + 1;
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = current;
          queue.push([newDist, neighbor]);
        }
      }
    }
    
    // Reconstruct path
    const path = [];
    let current = end;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
    
    return path;
  };

  const runAlgorithm = () => {
    setIsRunning(true);
    const size = graph.length;
    let result;
    
    switch (algorithm) {
      case 'bfs':
        result = bfs(start, end, size);
        break;
      case 'dfs':
        result = dfs(start, end, size);
        break;
      case 'dijkstra':
        result = dijkstra(start, end, size);
        break;
      default:
        result = [];
    }
    
    animatePath(result);
  };

  const animatePath = (resultPath) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < resultPath.length) {
        setPath(resultPath.slice(0, index + 1));
        setVisited(resultPath.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        if (resultPath.length > 0 && resultPath[resultPath.length - 1] === end) {
          setLevel(prev => prev + 1);
        }
      }
    }, 300);
  };

  const isInPath = (node) => path.includes(node);
  const isVisited = (node) => visited.includes(node);

  return (
    <div className="graph-wars">
      <h2>🛣️ Graph Wars</h2>
      
      <div className="game-info">
        <div className="level-info">
          <span>Level: {level}</span>
        </div>
        
        <div className="algorithm-selector">
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
          >
            <option value="bfs">Breadth-First Search (BFS)</option>
            <option value="dfs">Depth-First Search (DFS)</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
          </select>
        </div>
      </div>

      <div className="graph-container">
        <div className="graph">
          {graph.map((row, rowIndex) => (
            <div key={rowIndex} className="graph-row">
              {row.map((cell, colIndex) => {
                const node = rowIndex * graph.length + colIndex;
                const isStart = node === start;
                const isEnd = node === end;
                
                return (
                  <div
                    key={colIndex}
                    className={`graph-cell ${
                      cell === 0 ? 'wall' :
                      isStart ? 'start' :
                      isEnd ? 'end' :
                      isInPath(node) ? 'path' :
                      isVisited(node) ? 'visited' : 'empty'
                    }`}
                  >
                    {isStart && 'S'}
                    {isEnd && 'E'}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button onClick={runAlgorithm} disabled={isRunning}>
          Run {algorithm.toUpperCase()}
        </button>
        <button onClick={generateGraph} disabled={isRunning}>
          New Graph
        </button>
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
          <span>Path</span>
        </div>
        <div className="legend-item">
          <div className="legend-color visited"></div>
          <span>Visited</span>
        </div>
        <div className="legend-item">
          <div className="legend-color wall"></div>
          <span>Wall</span>
        </div>
      </div>

      <div className="explanation">
        <h3>Algorithm Differences:</h3>
        <ul>
          <li><strong>BFS:</strong> Explores all neighbors at current depth before moving deeper</li>
          <li><strong>DFS:</strong> Explores as far as possible along each branch before backtracking</li>
          <li><strong>Dijkstra:</strong> Finds shortest path considering all possible routes</li>
        </ul>
      </div>
    </div>
  );
};

export default GraphWars; 