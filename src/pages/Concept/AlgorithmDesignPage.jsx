import React, { useState } from 'react';

const AlgorithmDesignPage = () => {
  const [activeExample, setActiveExample] = useState('merge-sort');

  const paradigms = [
    {
      name: 'Divide and Conquer',
      description: 'Break problems into smaller subproblems, solve recursively',
      icon: '🔀',
      color: '#3b82f6'
    },
    {
      name: 'Greedy Algorithms',
      description: 'Make locally optimal choices at each step',
      icon: '🎯',
      color: '#10b981'
    },
    {
      name: 'Dynamic Programming',
      description: 'Store results of subproblems to avoid redundant calculations',
      icon: '📊',
      color: '#8b5cf6'
    },
    {
      name: 'Backtracking',
      description: 'Try partial solutions and abandon if they cannot lead to complete solution',
      icon: '🔄',
      color: '#f59e0b'
    },
    {
      name: 'Two Pointers',
      description: 'Use two pointers to traverse data structures efficiently',
      icon: '👉',
      color: '#ef4444'
    },
    {
      name: 'Sliding Window',
      description: 'Maintain a window of elements and slide it for optimal solutions',
      icon: '🪟',
      color: '#06b6d4'
    },
    {
      name: 'Branch and Bound',
      description: 'Systematically enumerate solutions using bounding functions',
      icon: '🌳',
      color: '#84cc16'
    },
    {
      name: 'Randomized',
      description: 'Use random numbers to make decisions or improve performance',
      icon: '🎲',
      color: '#ec4899'
    },
    {
      name: 'Brute Force',
      description: 'Try all possible solutions until finding the correct one',
      icon: '💪',
      color: '#6b7280'
    }
  ];

  const examples = {
    'merge-sort': {
      title: 'Merge Sort',
      paradigm: 'Divide and Conquer',
      complexity: 'O(n log n)',
      description: 'Efficiently sorts an array by dividing it into smaller parts',
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i), right.slice(j));
}`
    },
    'dijkstra': {
      title: 'Dijkstra\'s Algorithm',
      paradigm: 'Greedy',
      complexity: 'O((V + E) log V)',
      description: 'Finds shortest path from source to all vertices',
      code: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = [[0, start]];
  
  // Initialize distances
  for (let vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [dist, current] = pq.shift();
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    for (let neighbor in graph[current]) {
      const newDist = dist + graph[current][neighbor];
      
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      }
    }
  }
  
  return distances;
}`
    },
    'knapsack': {
      title: '0/1 Knapsack',
      paradigm: 'Dynamic Programming',
      complexity: 'O(nW)',
      description: 'Find maximum value items that fit in knapsack capacity',
      code: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          values[i-1] + dp[i-1][w - weights[i-1]],
          dp[i-1][w]
        );
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  
  return dp[n][capacity];
}

// Space optimized version
function knapsackOptimized(weights, values, capacity) {
  const dp = Array(capacity + 1).fill(0);
  
  for (let i = 0; i < weights.length; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }
  
  return dp[capacity];
}`
    },
    'n-queens': {
      title: 'N-Queens Problem',
      paradigm: 'Backtracking',
      complexity: 'O(N!)',
      description: 'Place N queens on N×N chessboard so none attack each other',
      code: `function solveNQueens(n) {
  const result = [];
  const board = Array(n).fill().map(() => Array(n).fill('.'));
  
  function isValid(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    
    // Check diagonals
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    
    return true;
  }
  
  function backtrack(row) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }
  
  backtrack(0);
  return result;
}`
    },
    'two-sum': {
      title: 'Two Sum',
      paradigm: 'Two Pointers',
      complexity: 'O(n log n)',
      description: 'Find two numbers in array that add up to target',
      code: `function twoSum(nums, target) {
  const indexed = nums.map((num, i) => [num, i])
                     .sort((a, b) => a[0] - b[0]);
  
  let left = 0, right = indexed.length - 1;
  
  while (left < right) {
    const sum = indexed[left][0] + indexed[right][0];
    
    if (sum === target) {
      return [indexed[left][1], indexed[right][1]];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return [];
}

// Hash map approach - O(n)
function twoSumHash(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`
    },
    'sliding-window': {
      title: 'Longest Substring',
      paradigm: 'Sliding Window',
      complexity: 'O(n)',
      description: 'Find longest substring without repeating characters',
      code: `function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0, maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// Max sum subarray of size k
function maxSumSubarray(arr, k) {
  let maxSum = 0, windowSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}`
    }
  };

  return (
    <div className="algorithm-design-container">
      <div className="algorithm-design-page">
        {/* Header Section */}
        <div className="header-section">
          <h1>
            Algorithm Design Paradigms
          </h1>
          <p>Master the fundamental approaches to solving computational problems efficiently</p>
        </div>

        {/* Paradigms Grid */}
        <div className="paradigms-section">
          <h2>Design Paradigms</h2>
          <div className="paradigms-grid">
            {paradigms.map((paradigm, index) => (
              <div key={index} className="paradigm-card" style={{'--card-color': paradigm.color}}>
                <div className="paradigm-icon">{paradigm.icon}</div>
                <h3>{paradigm.name}</h3>
                <p>{paradigm.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Examples Section */}
        <div className="examples-section">
          <h2>Implementation Examples</h2>
          
          <div className="example-tabs">
            {Object.keys(examples).map((key) => (
              <button
                key={key}
                className={`tab-button ${activeExample === key ? 'active' : ''}`}
                onClick={() => setActiveExample(key)}
              >
                {examples[key].title}
              </button>
            ))}
          </div>

          <div className="example-content">
            <div className="example-header">
              <div className="example-info">
                <h3>{examples[activeExample].title}</h3>
                <div className="example-meta">
                  <span className="paradigm-tag">{examples[activeExample].paradigm}</span>
                  <span className="complexity-tag">{examples[activeExample].complexity}</span>
                </div>
              </div>
              <p className="example-description">{examples[activeExample].description}</p>
            </div>
            
            <div className="code-container">
              <div className="code-header">
                <div className="code-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre className="code-block">
                <code>{examples[activeExample].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style>{`
        .algorithm-design-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg,rgb(138, 140, 151) 0%,rgb(201, 194, 209) 100%);
          min-height: 100vh;
          padding: 20px 0;
        }

        .algorithm-design-page {
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
          background: linear-gradient(90deg, #3b82f6, #10b981, #8b5cf6, #f59e0b);
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

        /* Paradigms Section */
        .paradigms-section {
          margin-bottom: 60px;
        }

        .paradigms-section h2 {
          font-size: 2.2rem;
          font-weight: 600;
          color: #1f2937;
          text-align: center;
          margin-bottom: 40px;
        }

        .paradigms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .paradigm-card {
          background: rgb(202, 207, 212);
          border-radius: 16px;
          padding: 30px 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-top: 4px solid var(--card-color);
          position: relative;
          overflow: hidden;
        }

        .paradigm-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--card-color)05, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .paradigm-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }

        .paradigm-card:hover::before {
          opacity: 1;
        }

        .paradigm-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
          display: block;
        }

        .paradigm-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 12px;
        }

        .paradigm-card p {
          color: #6b7280;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        /* Examples Section */
        .examples-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .examples-section h2 {
          font-size: 2.2rem;
          font-weight: 600;
          color: #1f2937;
          text-align: center;
          margin-bottom: 40px;
        }

        .example-tabs {
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
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .example-content {
          background: #f8fafc;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .example-header {
          padding: 24px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
        }

        .example-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .example-info h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .example-meta {
          display: flex;
          gap: 8px;
        }

        .paradigm-tag, .complexity-tag {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .paradigm-tag {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .complexity-tag {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .example-description {
          color: #6b7280;
          line-height: 1.5;
          margin: 0;
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
          .algorithm-design-page {
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
          
          .paradigms-grid {
            grid-template-columns: 1fr;
          }
          
          .examples-section {
            padding: 24px;
          }
          
          .example-tabs {
            flex-direction: column;
          }
          
          .tab-button {
            text-align: center;
          }
          
          .example-info {
            flex-direction: column;
            align-items: flex-start;
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

export default AlgorithmDesignPage;