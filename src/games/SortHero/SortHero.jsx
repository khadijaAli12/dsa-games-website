import React, { useState, useEffect, useRef } from 'react';
import { sortLogic } from './SortLogic';
import './SortStyles.scss';

const SortHero = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [sortingSteps, setSortingSteps] = useState([]);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [comparingElements, setComparingElements] = useState([]);
  const [swappingElements, setSwappingElements] = useState([]);
  const [sortedElements, setSortedElements] = useState([]);
  const [speed, setSpeed] = useState(800);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const algorithmInfo = {
    bubble: {
      name: "Bubble Sort",
      complexity: "O(n²)",
      description: "Compares adjacent elements and swaps if they're in wrong order",
      steps: [
        "1. Compare first two adjacent elements",
        "2. If left > right, swap them",
        "3. Move to next pair and repeat",
        "4. After each pass, largest element 'bubbles' to the end"
      ]
    },
    selection: {
      name: "Selection Sort", 
      complexity: "O(n²)",
      description: "Finds minimum element and places it at the beginning",
      steps: [
        "1. Find the minimum element in unsorted portion",
        "2. Swap it with the first unsorted element",
        "3. Move the boundary of unsorted portion",
        "4. Repeat until array is sorted"
      ]
    },
    insertion: {
      name: "Insertion Sort",
      complexity: "O(n²)",
      description: "Builds sorted array one element at a time",
      steps: [
        "1. Take next element from unsorted portion",
        "2. Compare with elements in sorted portion",
        "3. Shift larger elements to the right",
        "4. Insert element at correct position"
      ]
    },
    merge: {
      name: "Merge Sort",
      complexity: "O(n log n)", 
      description: "Divides array into halves, sorts them, then merges",
      steps: [
        "1. Divide array into two halves",
        "2. Recursively sort both halves",
        "3. Merge the sorted halves",
        "4. Compare elements and place in order"
      ]
    }
  };

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    const newArray = Array.from({ length: 8 }, () => 
      Math.floor(Math.random() * 50) + 5
    );
    setArray(newArray);
    setOriginalArray([...newArray]);
    setCurrentStep(0);
    setIsSorting(false);
    setIsPaused(false);
    setSortingSteps([]);
    setCurrentExplanation('Click "Start Sorting" to begin the algorithm');
    setComparingElements([]);
    setSwappingElements([]);
    setSortedElements([]);
  };

  const startSorting = () => {
    if (isPaused) {
      setIsPaused(false);
      resumeSorting();
      return;
    }

    setIsSorting(true);
    setIsPaused(false);
    const steps = sortLogic[algorithm](array);
    setSortingSteps(steps);
    setCurrentStep(0);
    animateSorting(steps, 0);
  };

  const pauseSorting = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  const resumeSorting = () => {
    if (sortingSteps.length > 0) {
      animateSorting(sortingSteps, currentStep);
    }
  };

  const animateSorting = (steps, startIndex) => {
    if (startIndex >= steps.length) {
      setIsSorting(false);
      setCurrentExplanation('Sorting complete! Array is now sorted.');
      setSortedElements(array.map((_, index) => index));
      setComparingElements([]);
      setSwappingElements([]);
      return;
    }

    const step = steps[startIndex];
    setArray(step.array);
    setCurrentStep(startIndex + 1);
    setCurrentExplanation(step.explanation);
    setComparingElements(step.comparing || []);
    setSwappingElements(step.swapping || []);
    setSortedElements(step.sorted || []);

    intervalRef.current = setTimeout(() => {
      if (!isPaused) {
        animateSorting(steps, startIndex + 1);
      }
    }, speed);
  };

  const resetSorting = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    setArray([...originalArray]);
    setCurrentStep(0);
    setIsSorting(false);
    setIsPaused(false);
    setSortingSteps([]);
    setCurrentExplanation('Array reset to original state');
    setComparingElements([]);
    setSwappingElements([]);
    setSortedElements([]);
  };

  const getElementClass = (index) => {
    let classes = 'array-element';
    if (sortedElements.includes(index)) classes += ' sorted';
    if (comparingElements.includes(index)) classes += ' comparing';
    if (swappingElements.includes(index)) classes += ' swapping';
    return classes;
  };

  return (
    <div className="sort-hero">
      <div className="header">
        <h2>Learn Sorting Algorithms</h2>
        <p>Watch how different algorithms sort data step by step</p>
      </div>

      <div className="algorithm-info">
        <div className="current-algorithm">
          <h3>{algorithmInfo[algorithm].name}</h3>
          <p><strong>Time Complexity:</strong> {algorithmInfo[algorithm].complexity}</p>
          <p>{algorithmInfo[algorithm].description}</p>
        </div>
        
        <div className="algorithm-steps">
          <h4>How it works:</h4>
          <ol>
            {algorithmInfo[algorithm].steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>Algorithm:</label>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isSorting && !isPaused}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
          </select>
        </div>

        <div className="control-group">
          <label>Speed:</label>
          <select 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting && !isPaused}
          >
            <option value="1200">Slow</option>
            <option value="800">Normal</option>
            <option value="400">Fast</option>
          </select>
        </div>

        <div className="control-buttons">
          <button onClick={generateNewArray} disabled={isSorting && !isPaused}>
            New Array
          </button>
          
          {!isSorting ? (
            <button onClick={startSorting} className="primary">
              Start Sorting
            </button>
          ) : (
            <>
              {!isPaused ? (
                <button onClick={pauseSorting}>Pause</button>
              ) : (
                <button onClick={startSorting} className="primary">Resume</button>
              )}
            </>
          )}
          
          <button onClick={resetSorting} disabled={!isSorting && currentStep === 0}>
            Reset
          </button>
        </div>
      </div>

      <div className="visualization">
        <div className="array-display">
          {array.map((value, index) => (
            <div 
              key={`${index}-${value}`}
              className={getElementClass(index)}
              style={{ height: `${value * 4}px` }}
            >
              <span className="value">{value}</span>
            </div>
          ))}
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-color comparing"></div>
            <span>Comparing</span>
          </div>
          <div className="legend-item">
            <div className="legend-color swapping"></div>
            <span>Swapping</span>
          </div>
          <div className="legend-item">
            <div className="legend-color sorted"></div>
            <span>Sorted</span>
          </div>
        </div>
      </div>

      <div className="explanation-panel">
        <div className="current-step">
          <h4>Step {currentStep} of {sortingSteps.length}</h4>
          <p>{currentExplanation}</p>
        </div>
        
        {isSorting && (
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentStep / sortingSteps.length) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      <div className="educational-content">
        <div className="concept-explanation">
          <h3>Key Concepts</h3>
          <div className="concepts">
            <div className="concept">
              <h4>🔍 Comparison</h4>
              <p>Elements are compared to determine their relative order. The algorithm decides which element should come first.</p>
            </div>
            <div className="concept">
              <h4>↔️ Swapping</h4>
              <p>When elements are in the wrong order, they swap positions. This gradually moves elements to their correct places.</p>
            </div>
            <div className="concept">
              <h4>✅ Sorted Position</h4>
              <p>Once an element reaches its final correct position, it's considered sorted and won't move again.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortHero;