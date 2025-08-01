import React, { useState } from 'react';

const DataStructuresPage = () => {
  const [activeStructure, setActiveStructure] = useState('array');

  const dataStructures = [
    {
      id: 'linear',
      name: 'Linear Structures',
      items: [
        { name: 'Arrays', icon: '📊', complexity: 'O(1) access', description: 'Fixed-size sequential collection of elements' },
        { name: 'Linked Lists', icon: '🔗', complexity: 'O(n) access', description: 'Dynamic collection with pointer-based connections' },
        { name: 'Stacks', icon: '📚', complexity: 'O(1) operations', description: 'LIFO (Last In, First Out) principle' },
        { name: 'Queues', icon: '🚶‍♂️', complexity: 'O(1) operations', description: 'FIFO (First In, First Out) principle' }
      ]
    },
    {
      id: 'non-linear',
      name: 'Non-Linear Structures',
      items: [
        { name: 'Binary Trees', icon: '🌳', complexity: 'O(log n) search', description: 'Hierarchical structure with at most 2 children per node' },
        { name: 'Heaps', icon: '⛰️', complexity: 'O(log n) insert', description: 'Complete binary tree with heap property' },
        { name: 'Graphs', icon: '🕸️', complexity: 'O(V+E) traversal', description: 'Collection of vertices connected by edges' },
        { name: 'Tries', icon: '🔤', complexity: 'O(m) search', description: 'Prefix tree for string operations' }
      ]
    },
    {
      id: 'hash-based',
      name: 'Hash-Based Structures',
      items: [
        { name: 'Hash Tables', icon: '🗂️', complexity: 'O(1) average', description: 'Key-value pairs using hash functions' },
        { name: 'Hash Sets', icon: '📋', complexity: 'O(1) lookup', description: 'Collection of unique elements using hash' },
        { name: 'Bloom Filters', icon: '🌸', complexity: 'O(1) check', description: 'Probabilistic data structure for membership testing' }
      ]
    }
  ];

  const implementations = {
    'array': {
      title: 'Dynamic Array Implementation',
      description: 'Resizable array with automatic memory management',
      timeComplexity: 'Access: O(1), Insert: O(n), Delete: O(n)',
      spaceComplexity: 'O(n)',
      code: `class DynamicArray {
  constructor() {
    this.data = {};
    this.length = 0;
  }
  
  get(index) {
    return this.data[index];
  }
  
  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }
  
  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }
  
  insert(index, item) {
    // Shift elements to the right
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = item;
    this.length++;
  }
  
  delete(index) {
    const item = this.data[index];
    // Shift elements to the left
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
    return item;
  }
}`
    },
    'linkedlist': {
      title: 'Doubly Linked List',
      description: 'Bidirectional linked list with head and tail pointers',
      timeComplexity: 'Access: O(n), Insert: O(1), Delete: O(1)',
      spaceComplexity: 'O(n)',
      code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  append(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }
  
  prepend(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }
  
  remove(data) {
    let current = this.head;
    
    while (current) {
      if (current.data === data) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;
        
        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;
        
        this.length--;
        return current.data;
      }
      current = current.next;
    }
    return null;
  }
}`
    },
    'stack': {
      title: 'Stack with Array',
      description: 'LIFO data structure implementation with dynamic resizing',
      timeComplexity: 'Push: O(1), Pop: O(1), Peek: O(1)',
      spaceComplexity: 'O(n)',
      code: `class Stack {
  constructor() {
    this.items = [];
    this.top = -1;
  }
  
  push(element) {
    this.top++;
    this.items[this.top] = element;
  }
  
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    const element = this.items[this.top];
    this.items.length = this.top;
    this.top--;
    return element;
  }
  
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.top];
  }
  
  isEmpty() {
    return this.top === -1;
  }
  
  size() {
    return this.top + 1;
  }
  
  clear() {
    this.items = [];
    this.top = -1;
  }
  
  // Convert infix to postfix
  infixToPostfix(infix) {
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    const result = [];
    const stack = new Stack();
    
    for (let char of infix) {
      if (/[a-zA-Z0-9]/.test(char)) {
        result.push(char);
      } else if (char === '(') {
        stack.push(char);
      } else if (char === ')') {
        while (!stack.isEmpty() && stack.peek() !== '(') {
          result.push(stack.pop());
        }
        stack.pop(); // Remove '('
      } else {
        while (!stack.isEmpty() && 
               precedence[stack.peek()] >= precedence[char]) {
          result.push(stack.pop());
        }
        stack.push(char);
      }
    }
    
    while (!stack.isEmpty()) {
      result.push(stack.pop());
    }
    
    return result.join('');
  }
}`
    },
    'bst': {
      title: 'Binary Search Tree',
      description: 'Self-organizing binary tree with ordered property',
      timeComplexity: 'Search: O(log n), Insert: O(log n), Delete: O(log n)',
      spaceComplexity: 'O(n)',
      code: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(val) {
    this.root = this._insertNode(this.root, val);
  }
  
  _insertNode(node, val) {
    if (!node) return new TreeNode(val);
    
    if (val < node.val) {
      node.left = this._insertNode(node.left, val);
    } else if (val > node.val) {
      node.right = this._insertNode(node.right, val);
    }
    
    return node;
  }
  
  search(val) {
    return this._searchNode(this.root, val);
  }
  
  _searchNode(node, val) {
    if (!node) return false;
    if (val === node.val) return true;
    
    return val < node.val 
      ? this._searchNode(node.left, val)
      : this._searchNode(node.right, val);
  }
  
  inorderTraversal() {
    const result = [];
    this._inorder(this.root, result);
    return result;
  }
  
  _inorder(node, result) {
    if (node) {
      this._inorder(node.left, result);
      result.push(node.val);
      this._inorder(node.right, result);
    }
  }
  
  findMin() {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current ? current.val : null;
  }
  
  findMax() {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current ? current.val : null;
  }
}`
    },
    'hashtable': {
      title: 'Hash Table with Chaining',
      description: 'Hash table implementation using separate chaining for collision resolution',
      timeComplexity: 'Average: O(1), Worst: O(n)',
      spaceComplexity: 'O(n)',
      code: `class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.buckets = new Array(size).fill(null).map(() => []);
    this.numKeys = 0;
  }
  
  _hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.size;
  }
  
  set(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    
    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    
    // Add new key-value pair
    bucket.push([key, value]);
    this.numKeys++;
    
    // Resize if load factor > 0.7
    if (this.numKeys > this.size * 0.7) {
      this._resize();
    }
  }
  
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    
    return undefined;
  }
  
  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.numKeys--;
        return true;
      }
    }
    
    return false;
  }
  
  _resize() {
    const oldBuckets = this.buckets;
    this.size *= 2;
    this.buckets = new Array(this.size).fill(null).map(() => []);
    this.numKeys = 0;
    
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
  
  keys() {
    const allKeys = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        allKeys.push(key);
      }
    }
    return allKeys;
  }
}`
    },
    'graph': {
      title: 'Graph with Adjacency List',
      description: 'Graph implementation supporting both directed and undirected graphs',
      timeComplexity: 'Add Vertex: O(1), Add Edge: O(1), DFS/BFS: O(V+E)',
      spaceComplexity: 'O(V+E)',
      code: `class Graph {
  constructor(isDirected = false) {
    this.adjacencyList = {};
    this.isDirected = isDirected;
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  
  addEdge(vertex1, vertex2, weight = 1) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    
    if (!this.isDirected) {
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
  }
  
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1]
      .filter(edge => edge.node !== vertex2);
    
    if (!this.isDirected) {
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2]
        .filter(edge => edge.node !== vertex1);
    }
  }
  
  dfs(start, visited = new Set()) {
    const result = [];
    
    const dfsHelper = (vertex) => {
      if (!vertex || visited.has(vertex)) return;
      
      visited.add(vertex);
      result.push(vertex);
      
      for (const edge of this.adjacencyList[vertex]) {
        dfsHelper(edge.node);
      }
    };
    
    dfsHelper(start);
    return result;
  }
  
  bfs(start) {
    const queue = [start];
    const visited = new Set([start]);
    const result = [];
    
    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);
      
      for (const edge of this.adjacencyList[vertex]) {
        if (!visited.has(edge.node)) {
          visited.add(edge.node);
          queue.push(edge.node);
        }
      }
    }
    
    return result;
  }
  
  hasPath(start, end) {
    const visited = new Set();
    const stack = [start];
    
    while (stack.length) {
      const vertex = stack.pop();
      
      if (vertex === end) return true;
      if (visited.has(vertex)) continue;
      
      visited.add(vertex);
      
      for (const edge of this.adjacencyList[vertex]) {
        stack.push(edge.node);
      }
    }
    
    return false;
  }
}`
    }
  };

  return (
    <div className="data-structures-container">
      <div className="data-structures-page">
        {/* Header Section */}
        <div className="header-section">
          <h1>
            <span className="title-icon"></span>
            Data Structures
          </h1>
          <p>Master the fundamental ways of organizing and storing data for efficient access and modification</p>
        </div>

        {/* Categories Section */}
        <div className="categories-section">
          <h2>Data Structure Categories</h2>
          {dataStructures.map((category) => (
            <div key={category.id} className="category-container">
              <h3 className="category-title">{category.name}</h3>
              <div className="structures-grid">
                {category.items.map((item, index) => (
                  <div key={index} className="structure-card">
                    <div className="structure-icon">{item.icon}</div>
                    <div className="structure-info">
                      <h4>{item.name}</h4>
                      <p className="structure-description">{item.description}</p>
                      <span className="complexity-badge">{item.complexity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Examples */}
        <div className="implementations-section">
          <h2>Implementation Examples</h2>
          
          <div className="implementation-tabs">
            {Object.keys(implementations).map((key) => (
              <button
                key={key}
                className={`tab-button ${activeStructure === key ? 'active' : ''}`}
                onClick={() => setActiveStructure(key)}
              >
                {implementations[key].title.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="implementation-content">
            <div className="implementation-header">
              <div className="implementation-info">
                <h3>{implementations[activeStructure].title}</h3>
                <p className="implementation-description">
                  {implementations[activeStructure].description}
                </p>
              </div>
              <div className="complexity-info">
                <div className="complexity-item">
                  <span className="complexity-label">Time:</span>
                  <span className="complexity-value">{implementations[activeStructure].timeComplexity}</span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Space:</span>
                  <span className="complexity-value">{implementations[activeStructure].spaceComplexity}</span>
                </div>
              </div>
            </div>
            
            <div className="code-container">
              <div className="code-header">
                <div className="code-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre className="code-block">
                <code>{implementations[activeStructure].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style>{`
        .data-structures-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg,rgb(138, 140, 151) 0%,rgb(201, 194, 209) 100%);
          min-height: 100vh;
          padding: 20px 0;
        }

        .data-structures-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header Section */
        .header-section {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }

        .header-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
        }

        .header-section h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .title-icon {
          font-size: 2.5rem;
        }

        .header-section p {
          font-size: 1.2rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Categories Section */
        .categories-section {
          margin-bottom: 60px;
        }

        .categories-section h2 {
          font-size: 2.2rem;
          font-weight: 600;
          color: white;
          text-align: center;
          margin-bottom: 40px;
        }

        .category-container {
          background: white;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .category-title {
          font-size: 1.6rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f3f4f6;
        }

        .structures-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .structure-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background:rgb(202, 207, 212);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .structure-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          background: white;
        }

        .structure-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .structure-info h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .structure-description {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .complexity-badge {
          display: inline-block;
          padding: 4px 8px;
          background: #dbeafe;
          color: #1d4ed8;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        /* Implementations Section */
        .implementations-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .implementations-section h2 {
          font-size: 2.2rem;
          font-weight: 600;
          color: #1f2937;
          text-align: center;
          margin-bottom: 40px;
        }

        .implementation-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 30px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .tab-button {
          padding: 12px 20px;
          border: none;
          background: #f3f4f6;
          color: #6b7280;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-size: 0.9rem;
        }

        .tab-button:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .implementation-content {
          background: #f8fafc;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .implementation-header {
          padding: 24px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
        }

        .implementation-info h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .implementation-description {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .complexity-info {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .complexity-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .complexity-label {
          font-weight: 600;
          color: #374151;
        }

        .complexity-value {
          padding: 4px 8px;
          background: #f3e8ff;
          color: #7c3aed;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .code-container {
          position: relative;
        }

        .code-header {
          background: #1f2937;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .code-dots {
          display: flex;
          gap: 6px;
        }

        .code-dots span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #6b7280;
        }

        .code-dots span:nth-child(1) { background: #ef4444; }
        .code-dots span:nth-child(2) { background: #f59e0b; }
        .code-dots span:nth-child(3) { background: #10b981; }

        .code-lang {
          color: #9ca3af;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .code-block {
          background: #1f2937;
          color: #e5e7eb;
          padding: 24px;
          margin: 0;
          overflow-x: auto;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 14px;
          line-height: 1.6;
        }

        .code-block code {
          color: #e5e7eb;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .data-structures-page {
            padding: 0 15px;
          }
          
          .header-section {
            padding: 40px 20px;
          }
          
          .header-section h1 {
            font-size: 2.2rem;
            flex-direction: column;
            gap: 8px;
          }
          
          .structures-grid {
            grid-template-columns: 1fr;
          }
          
          .implementations-section {
            padding: 24px;
          }
          
          .implementation-tabs {
            flex-direction: column;
          }
          
          .tab-button {
            text-align: center;
          }
          
          .complexity-info {
            flex-direction: column;
          }
          
          .code-block {
            font-size: 13px;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default DataStructuresPage;