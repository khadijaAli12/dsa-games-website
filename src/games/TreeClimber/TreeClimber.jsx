import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './TreeClimberStyles.scss';

const TreeClimber = () => {
  const [tree, setTree] = useState([]);
  const [traversal, setTraversal] = useState('inorder');
  const [visited, setVisited] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateTree();
  }, [level]);

  const generateTree = () => {
    const size = Math.min(7, 3 + Math.floor(level / 2));
    
    // Create a proper binary tree structure
    const treeData = [];
    for (let i = 0; i < size; i++) {
      treeData.push({
        value: i + 10, // Start from 10 to make it more interesting
        left: 2 * i + 1 < size ? 2 * i + 1 : null,
        right: 2 * i + 2 < size ? 2 * i + 2 : null
      });
    }
    
    setTree(treeData);
    setVisited([]);
    setIsAnimating(false);
  };

  // FIXED: Correct Inorder Traversal - Left, Root, Right
  const inorderTraversal = (tree, nodeIndex = 0) => {
    const result = [];
    
    const traverse = (index) => {
      if (index === null || index >= tree.length) return;
      
      const node = tree[index];
      
      // First visit left subtree
      if (node.left !== null) {
        traverse(node.left);
      }
      
      // Then visit root
      result.push(index);
      
      // Finally visit right subtree
      if (node.right !== null) {
        traverse(node.right);
      }
    };
    
    traverse(nodeIndex);
    return result;
  };

  // FIXED: Correct Preorder Traversal - Root, Left, Right
  const preorderTraversal = (tree, nodeIndex = 0) => {
    const result = [];
    
    const traverse = (index) => {
      if (index === null || index >= tree.length) return;
      
      const node = tree[index];
      
      // First visit root
      result.push(index);
      
      // Then visit left subtree
      if (node.left !== null) {
        traverse(node.left);
      }
      
      // Finally visit right subtree
      if (node.right !== null) {
        traverse(node.right);
      }
    };
    
    traverse(nodeIndex);
    return result;
  };

  // FIXED: Correct Postorder Traversal - Left, Right, Root
  const postorderTraversal = (tree, nodeIndex = 0) => {
    const result = [];
    
    const traverse = (index) => {
      if (index === null || index >= tree.length) return;
      
      const node = tree[index];
      
      // First visit left subtree
      if (node.left !== null) {
        traverse(node.left);
      }
      
      // Then visit right subtree
      if (node.right !== null) {
        traverse(node.right);
      }
      
      // Finally visit root
      result.push(index);
    };
    
    traverse(nodeIndex);
    return result;
  };

  // FIXED: Correct Level Order Traversal - BFS using Queue
  const levelOrderTraversal = (tree) => {
    if (tree.length === 0) return [];
    
    const result = [];
    const queue = [0]; // Start with root index
    
    while (queue.length > 0) {
      const currentIndex = queue.shift();
      result.push(currentIndex);
      
      const currentNode = tree[currentIndex];
      
      // Add left child to queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      
      // Add right child to queue
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    
    return result;
  };

  const runTraversal = () => {
    if (tree.length === 0) return;
    
    setIsAnimating(true);
    setVisited([]);
    
    let traversalOrder = [];
    
    switch (traversal) {
      case 'inorder':
        traversalOrder = inorderTraversal(tree, 0);
        break;
      case 'preorder':
        traversalOrder = preorderTraversal(tree, 0);
        break;
      case 'postorder':
        traversalOrder = postorderTraversal(tree, 0);
        break;
      case 'levelorder':
        traversalOrder = levelOrderTraversal(tree);
        break;
      default:
        traversalOrder = [];
    }
    
    console.log(`${traversal} traversal order:`, traversalOrder.map(i => tree[i].value));
    animateTraversal(traversalOrder);
  };

  const animateTraversal = (order) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < order.length) {
        setVisited(prev => [...prev, order[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnimating(false);
        }, 1500);
      }
    }, 1000);
  };

  // Calculate proper tree positions for binary tree layout
  const calculatePositions = () => {
    if (tree.length === 0) return {};
    
    const positions = {};
    const containerWidth = 600;
    const nodeSize = 25;
    
    // Calculate tree depth
    const getMaxDepth = (nodeIndex, depth = 0) => {
      if (nodeIndex === null || nodeIndex >= tree.length) return depth;
      
      const node = tree[nodeIndex];
      const leftDepth = node.left !== null ? getMaxDepth(node.left, depth + 1) : depth;
      const rightDepth = node.right !== null ? getMaxDepth(node.right, depth + 1) : depth;
      
      return Math.max(leftDepth, rightDepth);
    };
    
    const maxDepth = getMaxDepth(0);
    const levelHeight = 80;
    
    // Position nodes using recursive approach
    const positionNode = (nodeIndex, depth, leftBound, rightBound) => {
      if (nodeIndex === null || nodeIndex >= tree.length) return;
      
      const centerX = (leftBound + rightBound) / 2;
      const y = 60 + depth * levelHeight;
      
      positions[nodeIndex] = {
        x: centerX,
        y: y
      };
      
      const node = tree[nodeIndex];
      
      // Position left and right children
      if (node.left !== null) {
        positionNode(node.left, depth + 1, leftBound, centerX);
      }
      
      if (node.right !== null) {
        positionNode(node.right, depth + 1, centerX, rightBound);
      }
    };
    
    positionNode(0, 0, nodeSize, containerWidth - nodeSize);
    return positions;
  };

  const renderTree = () => {
    if (tree.length === 0) return null;
    
    const positions = calculatePositions();
    const elements = [];
    
    // Render connections first (behind nodes)
    tree.forEach((node, nodeIndex) => {
      const nodePos = positions[nodeIndex];
      if (!nodePos) return;
      
      // Left child connection
      if (node.left !== null && positions[node.left]) {
        const childPos = positions[node.left];
        elements.push(
          <line
            key={`line-${nodeIndex}-left`}
            x1={nodePos.x}
            y1={nodePos.y}
            x2={childPos.x}
            y2={childPos.y}
            stroke="#333"
            strokeWidth="3"
            className="connection-line"
          />
        );
      }
      
      // Right child connection
      if (node.right !== null && positions[node.right]) {
        const childPos = positions[node.right];
        elements.push(
          <line
            key={`line-${nodeIndex}-right`}
            x1={nodePos.x}
            y1={nodePos.y}
            x2={childPos.x}
            y2={childPos.y}
            stroke="#333"
            strokeWidth="3"
            className="connection-line"
          />
        );
      }
    });
    
    // Render nodes on top of connections
    tree.forEach((node, nodeIndex) => {
      const nodePos = positions[nodeIndex];
      if (!nodePos) return;
      
      const isVisited = visited.includes(nodeIndex);
      const visitedIndex = visited.indexOf(nodeIndex);
      
      elements.push(
        <g key={`node-${nodeIndex}`}>
          <circle
            cx={nodePos.x}
            cy={nodePos.y}
            r="30"
            fill={isVisited ? "#28a745" : "#6c757d"}
            stroke="#333"
            strokeWidth="2"
            className={`tree-node ${isVisited ? 'visited' : ''}`}
          />
          <text
            x={nodePos.x}
            y={nodePos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="16"
            fontWeight="bold"
          >
            {node.value}
          </text>
          {isVisited && (
            <text
              x={nodePos.x}
              y={nodePos.y + 45}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#28a745"
              fontSize="12"
              fontWeight="bold"
              className="visit-order"
            >
              {visitedIndex + 1}
            </text>
          )}
        </g>
      );
    });
    
    return elements;
  };

  const maxDepth = tree.length > 0 ? Math.ceil(Math.log2(tree.length + 1)) : 1;
  const svgHeight = Math.max(300, 120 + maxDepth * 80);

  return (
    <div className="tree-climber">
      <Navbar />
      <div className="container">
        <h2 className="title">🌳 Tree Climber - Binary Tree Traversal</h2>
        
        <div className="game-info">
          <div className="stats">
            <span>Level: {level}</span>
            <span>Nodes: {tree.length}</span>
            <span>Tree Height: {maxDepth}</span>
          </div>
          
          <div className="traversal-selector">
            <select 
              value={traversal} 
              onChange={(e) => setTraversal(e.target.value)}
              disabled={isAnimating}
            >
              <option value="inorder">Inorder (Left→Root→Right)</option>
              <option value="preorder">Preorder (Root→Left→Right)</option>
              <option value="postorder">Postorder (Left→Right→Root)</option>
              <option value="levelorder">Level Order (BFS)</option>
            </select>
          </div>
        </div>

        <div className="tree-container">
          <svg 
            width="100%" 
            height={svgHeight}
            viewBox={`0 0 600 ${svgHeight}`}
            className="tree-svg"
          >
            {renderTree()}
          </svg>
        </div>

        <div className="controls">
          <button 
            onClick={runTraversal} 
            disabled={isAnimating}
            className="btn btn-primary"
          >
            {isAnimating ? 'Running...' : `Run ${traversal.charAt(0).toUpperCase() + traversal.slice(1)}`}
          </button>
          <button 
            onClick={generateTree} 
            disabled={isAnimating}
            className="btn btn-secondary"
          >
            New Tree
          </button>
          <button 
            onClick={() => setLevel(prev => prev + 1)} 
            disabled={isAnimating}
            className="btn btn-tertiary"
          >
            Next Level
          </button>
        </div>

        <div className="traversal-info">
          <h3>Traversal Order:</h3>
          <div className="visited-nodes">
            {visited.length === 0 && !isAnimating && (
              <span className="placeholder">Click "Run Traversal" to see the order</span>
            )}
            {visited.map((nodeIndex, index) => (
              <React.Fragment key={index}>
                <span className="visited-node">
                  <span className="node-number">{index + 1}</span>
                  <span className="node-value">{tree[nodeIndex]?.value}</span>
                </span>
                {index < visited.length - 1 && (
                  <span className="arrow">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="explanation">
          <h3>Binary Tree Traversal Algorithms:</h3>
          <div className="algorithm-grid">
            <div className="algorithm">
              <h4>Inorder (Left→Root→Right)</h4>
              <p>Visit left subtree, then root, then right subtree</p>
              <small>Use case: Gets sorted order in BST</small>
            </div>
            <div className="algorithm">
              <h4>Preorder (Root→Left→Right)</h4>
              <p>Visit root first, then left subtree, then right subtree</p>
              <small>Use case: Tree copying, expression evaluation</small>
            </div>
            <div className="algorithm">
              <h4>Postorder (Left→Right→Root)</h4>
              <p>Visit left subtree, then right subtree, then root</p>
              <small>Use case: Tree deletion, calculating directory sizes</small>
            </div>
            <div className="algorithm">
              <h4>Level Order (BFS)</h4>
              <p>Visit nodes level by level from left to right</p>
              <small>Use case: Tree serialization, finding shortest path</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeClimber;