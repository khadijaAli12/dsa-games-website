import React, { useState, useEffect } from 'react';
import './NetworkHackerStyles.scss';

const NetworkHacker = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [parent, setParent] = useState([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numNodes = Math.min(8, 4 + Math.floor(level / 2));
    const newNodes = Array.from({ length: numNodes }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    }));
    
    const newParent = Array(numNodes).fill().map((_, i) => i);
    
    setNodes(newNodes);
    setConnections([]);
    setParent(newParent);
    setIsAnimating(false);
  };

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    
    if (rootX !== rootY) {
      parent[rootY] = rootX;
      return true;
    }
    return false;
  };

  const connectNodes = (node1, node2) => {
    if (isAnimating) return;
    
    const connectionExists = connections.some(
      conn => (conn.from === node1 && conn.to === node2) || 
              (conn.from === node2 && conn.to === node1)
    );
    
    if (!connectionExists) {
      const newConnection = { from: node1, to: node2 };
      setConnections(prev => [...prev, newConnection]);
      
      const wasMerged = union(node1, node2);
      if (wasMerged) {
        setScore(prev => prev + 10);
      }
    }
  };

  const disconnectNodes = (node1, node2) => {
    if (isAnimating) return;
    
    setConnections(prev => 
      prev.filter(conn => 
        !((conn.from === node1 && conn.to === node2) || 
          (conn.from === node2 && conn.to === node1))
      )
    );
  };

  const getConnectedComponents = () => {
    const components = new Map();
    
    for (let i = 0; i < nodes.length; i++) {
      const root = find(i);
      if (!components.has(root)) {
        components.set(root, []);
      }
      components.get(root).push(i);
    }
    
    return Array.from(components.values());
  };

  const showUnionFind = () => {
    setIsAnimating(true);
    const components = getConnectedComponents();
    
    // Animate the union-find process
    let step = 0;
    const interval = setInterval(() => {
      if (step < connections.length) {
        const connection = connections[step];
        union(connection.from, connection.to);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnimating(false);
          const finalComponents = getConnectedComponents();
          if (finalComponents.length === 1) {
            setScore(prev => prev + level * 20);
            setLevel(prev => prev + 1);
          }
        }, 1000);
      }
    }, 500);
  };

  const getNodeColor = (nodeId) => {
    const root = find(nodeId);
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    return colors[root % colors.length];
  };

  return (
    <div className="network-hacker">
      <h2>🌐 Network Hacker</h2>
      
      <div className="game-info">
        <div className="stats">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
          <span>Components: {getConnectedComponents().length}</span>
        </div>
      </div>

      <div className="network-container">
        <div className="network">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="node"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                backgroundColor: getNodeColor(node.id)
              }}
              onClick={() => {
                // Handle node click for connection
                const selectedNodes = document.querySelectorAll('.node.selected');
                if (selectedNodes.length === 1) {
                  const firstNode = parseInt(selectedNodes[0].dataset.id);
                  if (firstNode !== node.id) {
                    connectNodes(firstNode, node.id);
                  }
                  selectedNodes[0].classList.remove('selected');
                } else {
                  node.classList.add('selected');
                }
              }}
              data-id={node.id}
            >
              {node.id}
            </div>
          ))}
          
          {connections.map((connection, index) => (
            <svg
              key={index}
              className="connection-line"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
            >
              <line
                x1={`${nodes[connection.from].x}%`}
                y1={`${nodes[connection.from].y}%`}
                x2={`${nodes[connection.to].x}%`}
                y2={`${nodes[connection.to].y}%`}
                stroke="#333"
                strokeWidth="2"
              />
            </svg>
          ))}
        </div>
      </div>

      <div className="controls">
        <button onClick={showUnionFind} disabled={isAnimating}>
          Show Union-Find
        </button>
        <button onClick={generateLevel} disabled={isAnimating}>
          New Network
        </button>
      </div>

      <div className="instructions">
        <h3>Instructions:</h3>
        <p>
          Click on two nodes to connect them. The Union-Find algorithm will show how
          connected components are merged. Try to connect all nodes into a single component!
        </p>
      </div>

      <div className="explanation">
        <h3>Union-Find Algorithm:</h3>
        <p>
          Union-Find (Disjoint Set) efficiently manages connected components. Each node
          starts as its own component. When you connect nodes, the algorithm merges
          their components. Nodes with the same color belong to the same component.
        </p>
      </div>
    </div>
  );
};

export default NetworkHacker; 