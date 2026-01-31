import React, { useState, useEffect } from 'react';

const PerformanceComparison = ({ algorithms, arrays }) => {
  const [results, setResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(
    Object.keys(algorithms).slice(0, 3)
  );

  // Performance measurement functions
  const measurePerformance = (algorithmFn, array) => {
    const startTime = performance.now();
    const startMemory = performance.memory?.usedJSHeapSize || 0;
    
    // Run the algorithm
    const result = algorithmFn([...array]);
    
    const endTime = performance.now();
    const endMemory = performance.memory?.usedJSHeapSize || 0;
    
    return {
      time: endTime - startTime,
      memory: endMemory - startMemory,
      result: result,
      arraySize: array.length
    };
  };

  // Algorithm implementations for comparison
  const algorithmImplementations = {
    bubble: (arr) => {
      const array = [...arr];
      for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
          }
        }
      }
      return array;
    },
    selection: (arr) => {
      const array = [...arr];
      for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
          if (array[j] < array[minIndex]) {
            minIndex = j;
          }
        }
        if (minIndex !== i) {
          [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
      }
      return array;
    },
    insertion: (arr) => {
      const array = [...arr];
      for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > current) {
          array[j + 1] = array[j];
          j--;
        }
        array[j + 1] = current;
      }
      return array;
    },
    merge: (arr) => {
      if (arr.length <= 1) return arr;
      
      const merge = (left, right) => {
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
      };
      
      const mid = Math.floor(arr.length / 2);
      const left = mergeSort(arr.slice(0, mid));
      const right = mergeSort(arr.slice(mid));
      
      return merge(left, right);
    }
  };

  const mergeSort = algorithmImplementations.merge;

  const runComparison = () => {
    setIsRunning(true);
    const newResults = [];
    
    // Test each selected algorithm on different array sizes
    const testArrays = [
      { name: 'Small (100)', data: Array.from({length: 100}, () => Math.floor(Math.random() * 1000)) },
      { name: 'Medium (1000)', data: Array.from({length: 1000}, () => Math.floor(Math.random() * 10000)) },
      { name: 'Large (5000)', data: Array.from({length: 5000}, () => Math.floor(Math.random() * 50000)) }
    ];
    
    selectedAlgorithms.forEach(algoName => {
      testArrays.forEach(testArray => {
        const performance = measurePerformance(
          algorithmImplementations[algoName], 
          testArray.data
        );
        
        newResults.push({
          algorithm: algoName,
          arraySize: testArray.name,
          time: performance.time,
          memory: performance.memory,
          timeComplexity: algorithms[algoName]?.complexity || 'Unknown'
        });
      });
    });
    
    // Sort results by algorithm and array size
    newResults.sort((a, b) => {
      if (a.algorithm !== b.algorithm) {
        return a.algorithm.localeCompare(b.algorithm);
      }
      return a.arraySize.localeCompare(b.arraySize);
    });
    
    setResults(newResults);
    setIsRunning(false);
  };

  const getPerformanceRating = (time) => {
    if (time < 1) return { rating: 'Excellent', color: '#10b981' };
    if (time < 10) return { rating: 'Good', color: '#3b82f6' };
    if (time < 100) return { rating: 'Fair', color: '#f59e0b' };
    return { rating: 'Poor', color: '#ef4444' };
  };

  const toggleAlgorithm = (algoName) => {
    setSelectedAlgorithms(prev => 
      prev.includes(algoName) 
        ? prev.filter(name => name !== algoName)
        : [...prev, algoName]
    );
  };

  return (
    <div className="performance-comparison">
      <div className="comparison-header">
        <h3>Algorithm Performance Comparison</h3>
        <p>Compare execution time and efficiency across different sorting algorithms</p>
      </div>

      <div className="algorithm-selector">
        <h4>Select Algorithms to Compare:</h4>
        <div className="algorithm-checkboxes">
          {Object.keys(algorithms).map(algoName => (
            <label key={algoName} className="algorithm-checkbox">
              <input
                type="checkbox"
                checked={selectedAlgorithms.includes(algoName)}
                onChange={() => toggleAlgorithm(algoName)}
                disabled={isRunning}
              />
              <span className="checkmark"></span>
              {algorithms[algoName]?.name || algoName}
            </label>
          ))}
        </div>
      </div>

      <div className="comparison-actions">
        <button 
          onClick={runComparison}
          className="btn btn-primary"
          disabled={isRunning || selectedAlgorithms.length === 0}
        >
          {isRunning ? 'Running Tests...' : 'Run Performance Comparison'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="results-section">
          <h4>Performance Results</h4>
          
          <div className="results-table">
            <div className="table-header">
              <div>Algorithm</div>
              <div>Array Size</div>
              <div>Time (ms)</div>
              <div>Performance</div>
              <div>Complexity</div>
            </div>
            
            {results.map((result, index) => {
              const perfRating = getPerformanceRating(result.time);
              return (
                <div key={index} className="table-row">
                  <div className="algorithm-name">{algorithms[result.algorithm]?.name || result.algorithm}</div>
                  <div className="array-size">{result.arraySize}</div>
                  <div className="time">{result.time.toFixed(2)} ms</div>
                  <div className="performance" style={{color: perfRating.color}}>
                    {perfRating.rating}
                  </div>
                  <div className="complexity">{result.timeComplexity}</div>
                </div>
              );
            })}
          </div>

          <div className="performance-insights">
            <h5>Key Insights:</h5>
            <ul>
              <li>O(n log n) algorithms (Merge Sort) scale better with large datasets</li>
              <li>O(n²) algorithms (Bubble, Selection, Insertion) become inefficient with large arrays</li>
              <li>Small datasets may not show significant performance differences</li>
              <li>Real-world performance can vary based on data characteristics</li>
            </ul>
          </div>
        </div>
      )}

      {isRunning && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Running performance tests...</p>
        </div>
      )}
    </div>
  );
};

export default PerformanceComparison;