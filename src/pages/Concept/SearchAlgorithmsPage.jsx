import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import '../../styles/global.scss';

const SearchAlgorithmsPage = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('binary');

  const searchAlgorithms = [
    {
      id: 'linear',
      name: 'Linear Search',
      complexity: 'O(n)',
      description: 'Sequentially checks each element until finding the target',
      bestCase: 'O(1) - Target at first position',
      worstCase: 'O(n) - Target at last position or not present',
      whenToUse: 'Unsorted arrays, small datasets, or when simplicity is preferred',
      advantages: ['Works on unsorted data', 'Simple implementation', 'No extra space required'],
      disadvantages: ['Slow for large datasets', 'Doesn\'t utilize data ordering'],
      implementation: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return index if found
    }
  }
  return -1; // Return -1 if not found
}

// Example usage:
// const index = linearSearch([3, 1, 4, 1, 5, 9], 4);
// console.log(index); // Output: 2`
    },
    {
      id: 'binary',
      name: 'Binary Search',
      complexity: 'O(log n)',
      description: 'Repeatedly divides sorted array in half to find target efficiently',
      bestCase: 'O(1) - Target at middle position',
      worstCase: 'O(log n) - Maximum divisions needed',
      whenToUse: 'Sorted arrays, large datasets, frequent searches',
      advantages: ['Very fast for sorted data', 'Efficient for large datasets', 'Predictable performance'],
      disadvantages: ['Requires sorted data', 'More complex implementation'],
      implementation: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found target
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Target not found
}

// Example usage:
// const sortedArray = [1, 3, 5, 7, 9, 11, 13];
// const index = binarySearch(sortedArray, 7);
// console.log(index); // Output: 3`
    },
    {
      id: 'interpolation',
      name: 'Interpolation Search',
      complexity: 'O(log log n) average, O(n) worst',
      description: 'Improves binary search by estimating target position based on value distribution',
      bestCase: 'O(1) - Uniformly distributed data',
      worstCase: 'O(n) - Poorly distributed data',
      whenToUse: 'Uniformly distributed sorted data, large datasets',
      advantages: ['Faster than binary search on uniform data', 'Adaptive to data distribution'],
      disadvantages: ['Performance degrades on non-uniform data', 'More complex calculation'],
      implementation: `function interpolationSearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right && target >= arr[left] && target <= arr[right]) {
    // Estimate position using interpolation formula
    const pos = left + Math.floor(
      ((target - arr[left]) * (right - left)) / (arr[right] - arr[left])
    );
    
    if (arr[pos] === target) {
      return pos; // Found target
    }
    
    if (arr[pos] < target) {
      left = pos + 1; // Search right
    } else {
      right = pos - 1; // Search left
    }
  }
  
  return -1; // Target not found
}

// Works best on uniformly distributed sorted arrays`
    },
    {
      id: 'exponential',
      name: 'Exponential Search',
      complexity: 'O(log n)',
      description: 'Combines linear search with binary search for unbounded arrays',
      bestCase: 'O(1) - Target near beginning',
      worstCase: 'O(log n) - Target at end or not present',
      whenToUse: 'Sorted unbounded arrays, when array size is unknown',
      advantages: ['Works on unbounded arrays', 'Efficient for targets near beginning'],
      disadvantages: ['Requires sorted data', 'Two-phase approach adds complexity'],
      implementation: `function exponentialSearch(arr, target) {
  // Handle empty array
  if (arr.length === 0) return -1;
  
  // If target is at first position
  if (arr[0] === target) return 0;
  
  // Find range where target might be
  let bound = 1;
  while (bound < arr.length && arr[bound] <= target) {
    bound *= 2;
  }
  
  // Perform binary search in identified range
  return binarySearchRange(arr, target, Math.floor(bound / 2), 
                          Math.min(bound, arr.length - 1));
}

function binarySearchRange(arr, target, left, right) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// Useful for searching in very large or infinite arrays`
    }
  ];

  const currentAlgorithm = searchAlgorithms.find(alg => alg.id === activeAlgorithm);

  return (
    <div className="search-algorithms-container">
      <Navbar />
      <div className="search-algorithms-page">
        {/* Header */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">Searching Algorithms</div>
            <h1>Efficient Search Techniques</h1>
            <p>
              Master different approaches to finding elements in data structures, 
              from simple linear search to advanced interpolation techniques.
            </p>
          </div>
        </section>

        {/* Algorithm Selection */}
        <section className="algorithm-selection">
          <h2>Search Algorithms</h2>
          <div className="algorithm-tabs">
            {searchAlgorithms.map(algorithm => (
              <button
                key={algorithm.id}
                className={`tab-button ${activeAlgorithm === algorithm.id ? 'active' : ''}`}
                onClick={() => setActiveAlgorithm(algorithm.id)}
              >
                {algorithm.name}
              </button>
            ))}
          </div>
        </section>

        {/* Algorithm Details */}
        {currentAlgorithm && (
          <section className="algorithm-details">
            <div className="algorithm-header">
              <h2>{currentAlgorithm.name}</h2>
              <div className="complexity-badge">
                Time Complexity: {currentAlgorithm.complexity}
              </div>
            </div>

            <div className="algorithm-content">
              <div className="description-section">
                <h3>Description</h3>
                <p>{currentAlgorithm.description}</p>
              </div>

              <div className="complexity-analysis">
                <h3>Complexity Analysis</h3>
                <div className="complexity-grid">
                  <div className="complexity-item">
                    <span className="label">Best Case:</span>
                    <span className="value">{currentAlgorithm.bestCase}</span>
                  </div>
                  <div className="complexity-item">
                    <span className="label">Worst Case:</span>
                    <span className="value">{currentAlgorithm.worstCase}</span>
                  </div>
                </div>
              </div>

              <div className="usage-guidelines">
                <h3>When to Use</h3>
                <p>{currentAlgorithm.whenToUse}</p>
              </div>

              <div className="pros-cons">
                <div className="advantages">
                  <h4>Advantages</h4>
                  <ul>
                    {currentAlgorithm.advantages.map((adv, index) => (
                      <li key={index}>{adv}</li>
                    ))}
                  </ul>
                </div>
                <div className="disadvantages">
                  <h4>Disadvantages</h4>
                  <ul>
                    {currentAlgorithm.disadvantages.map((dis, index) => (
                      <li key={index}>{dis}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="implementation-section">
                <h3>Implementation</h3>
                <div className="code-block">
                  <pre><code>{currentAlgorithm.implementation}</code></pre>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Comparison Table */}
        <section className="comparison-section">
          <h2>Algorithm Comparison</h2>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Time Complexity</th>
                  <th>Space Complexity</th>
                  <th>Data Requirement</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                {searchAlgorithms.map(algorithm => (
                  <tr key={algorithm.id}>
                    <td>{algorithm.name}</td>
                    <td>{algorithm.complexity}</td>
                    <td>O(1)</td>
                    <td>{algorithm.id === 'linear' ? 'Any order' : 'Sorted'}</td>
                    <td>{algorithm.whenToUse.split(',')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="demo-section">
          <h2>Interactive Demo</h2>
          <div className="demo-content">
            <p>Try out these search algorithms in our interactive games:</p>
            <div className="demo-actions">
              <button className="primary-btn" onClick={() => window.location.href = '/games/array-explorer'}>
                Array Explorer Game
              </button>
              <button className="secondary-btn" onClick={() => window.location.href = '/practice'}>
                Practice Problems
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchAlgorithmsPage;