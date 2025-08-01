import React, { useState, useEffect, useRef } from 'react';
import { arraySearchLogic } from './ArraySearchLogic';
import './ArrayExplorerStyles.scss';

const ArrayExplorer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(null);
  const [algorithm, setAlgorithm] = useState('linear');
  const [isSearching, setIsSearching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [searchSteps, setSearchSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [checkedElements, setCheckedElements] = useState([]);
  const [foundElement, setFoundElement] = useState(null);
  const [searchRange, setSearchRange] = useState([]);
  const [speed, setSpeed] = useState(800);
  const [gameMode, setGameMode] = useState('guided'); // 'guided' or 'challenge'
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedElements, setSelectedElements] = useState([]);
  const [challengeType, setChallengeType] = useState('predict'); // 'predict', 'optimize', 'race'
  const intervalRef = useRef(null);

  const algorithmInfo = {
    linear: {
      name: "Linear Search",
      complexity: "O(n)",
      description: "Searches elements one by one from start to end",
      bestCase: "O(1) - Element found at first position",
      worstCase: "O(n) - Element at last position or not found",
      steps: [
        "1. Start from the first element",
        "2. Compare current element with target",
        "3. If match found, return position",
        "4. If not, move to next element",
        "5. Repeat until element found or array exhausted"
      ]
    },
    binary: {
      name: "Binary Search",
      complexity: "O(log n)",
      description: "Divides sorted array in half repeatedly to find target",
      bestCase: "O(1) - Element found at middle position", 
      worstCase: "O(log n) - Maximum divisions needed",
      steps: [
        "1. Find middle element of sorted array",
        "2. Compare middle element with target",
        "3. If equal, element found!",
        "4. If target < middle, search left half",
        "5. If target > middle, search right half",
        "6. Repeat until found or search space empty"
      ]
    },
    twoPointer: {
      name: "Two Pointer Search",
      complexity: "O(n)",
      description: "Uses two pointers moving from opposite ends",
      bestCase: "O(1) - Sum found immediately",
      worstCase: "O(n) - Complete array traversal",
      steps: [
        "1. Place left pointer at start, right at end",
        "2. Calculate sum of elements at both pointers",
        "3. If sum equals target, pair found!",
        "4. If sum < target, move left pointer right",
        "5. If sum > target, move right pointer left",
        "6. Continue until pointers meet"
      ]
    }
  };

  useEffect(() => {
    generateNewArray();
  }, [algorithm]);

  const generateNewArray = () => {
    let newArray;
    let newTarget;

    if (algorithm === 'binary') {
      // Generate sorted array for binary search
      newArray = Array.from({ length: 10 }, () => 
        Math.floor(Math.random() * 50) + 1
      ).sort((a, b) => a - b);
      newTarget = newArray[Math.floor(Math.random() * newArray.length)];
    } else if (algorithm === 'twoPointer') {
      // Generate array for two pointer (finding pair that sums to target)
      newArray = Array.from({ length: 8 }, () => 
        Math.floor(Math.random() * 20) + 1
      ).sort((a, b) => a - b);
      // Generate target that has a valid pair
      const randomIdx1 = Math.floor(Math.random() * newArray.length);
      const randomIdx2 = Math.floor(Math.random() * newArray.length);
      newTarget = newArray[randomIdx1] + newArray[randomIdx2];
    } else {
      // Generate random array for linear search
      newArray = Array.from({ length: 10 }, () => 
        Math.floor(Math.random() * 50) + 1
      );
      newTarget = newArray[Math.floor(Math.random() * newArray.length)];
    }

    setArray(newArray);
    setTarget(newTarget);
    resetSearch();
  };

  const resetSearch = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    setCurrentStep(0);
    setIsSearching(false);
    setIsPaused(false);
    setSearchSteps([]);
    setCurrentExplanation(`Ready to search for ${target} using ${algorithmInfo[algorithm].name}`);
    setCheckedElements([]);
    setFoundElement(null);
    setSearchRange([]);
  };

  const startSearch = () => {
    if (isPaused) {
      setIsPaused(false);
      resumeSearch();
      return;
    }

    setIsSearching(true);
    setIsPaused(false);
    setAttempts(attempts + 1);
    
    const steps = arraySearchLogic[algorithm](array, target);
    setSearchSteps(steps);
    setCurrentStep(0);
    animateSearch(steps, 0);
  };

  const pauseSearch = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  const resumeSearch = () => {
    if (searchSteps.length > 0) {
      animateSearch(searchSteps, currentStep);
    }
  };

  const animateSearch = (steps, startIndex) => {
    if (startIndex >= steps.length) {
      setIsSearching(false);
      const lastStep = steps[steps.length - 1];
      
      if (lastStep.found !== null) {
        setCurrentExplanation(`🎉 Found ${target}! Search completed successfully.`);
        if (gameMode === 'challenge') {
          setScore(score + Math.max(100 - startIndex * 2, 20));
        }
      } else {
        setCurrentExplanation(`❌ Element ${target} not found in the array.`);
      }
      return;
    }

    const step = steps[startIndex];
    setCurrentStep(startIndex + 1);
    setCurrentExplanation(step.explanation);
    setCheckedElements(step.checked || []);
    setFoundElement(step.found);
    setSearchRange(step.range || []);

    intervalRef.current = setTimeout(() => {
      if (!isPaused) {
        animateSearch(steps, startIndex + 1);
      }
    }, speed);
  };

  const getElementClass = (index, value) => {
    let classes = 'array-element';
    
    if (Array.isArray(foundElement) ? foundElement.includes(index) : foundElement === index) {
      classes += ' found';
    }
    if (checkedElements.includes(index)) classes += ' checked';
    if (searchRange.includes(index)) classes += ' in-range';
    if (selectedElements.includes(index)) classes += ' selected';
    
    // Special styling for two pointer algorithm
    if (algorithm === 'twoPointer') {
      const step = searchSteps[currentStep - 1];
      if (step && step.pointers) {
        if (index === step.pointers.left) classes += ' left-pointer';
        if (index === step.pointers.right) classes += ' right-pointer';
      }
    }
    
    return classes;
  };

  const handleManualSearch = (index) => {
    if (gameMode !== 'challenge' || isSearching) return;

    if (algorithm === 'twoPointer') {
      // Two Pointer Challenge: Select two elements
      if (selectedElements.includes(index)) {
        // Deselect if already selected
        setSelectedElements(selectedElements.filter(i => i !== index));
        return;
      }

      if (selectedElements.length < 2) {
        const newSelected = [...selectedElements, index];
        setSelectedElements(newSelected);

        if (newSelected.length === 2) {
          // Check if the pair sums to target
          const sum = array[newSelected[0]] + array[newSelected[1]];
          setAttempts(attempts + 1);
          
          if (sum === target) {
            setFoundElement(newSelected);
            setCurrentExplanation(`🎉 Correct! ${array[newSelected[0]]} + ${array[newSelected[1]]} = ${target}`);
            setScore(score + Math.max(100 - attempts * 10, 20));
          } else {
            setCurrentExplanation(`❌ ${array[newSelected[0]]} + ${array[newSelected[1]]} = ${sum} ≠ ${target}. Try again!`);
            setTimeout(() => setSelectedElements([]), 1000);
          }
        }
      }
    } else {
      // Other algorithms challenge modes
      setAttempts(attempts + 1);
      
      if (challengeType === 'predict') {
        // Predict next element to be checked
        if (!isSearching) {
          startSearch();
          return;
        }
        
        const nextStep = searchSteps[currentStep];
        if (nextStep && nextStep.checked && nextStep.checked.includes(index)) {
          setCurrentExplanation(`🎉 Correct prediction! Algorithm will check position ${index} next`);
          setScore(score + 25);
        } else {
          setCurrentExplanation(`❌ Wrong prediction. Algorithm won't check position ${index} next`);
        }
      } else if (challengeType === 'optimize') {
        // Choose the optimal starting position
        if (algorithm === 'binary' && !isSearching) {
          const middle = Math.floor(array.length / 2);
          if (index === middle) {
            setCurrentExplanation(`🎉 Perfect! Starting from middle (${index}) is optimal for binary search`);
            setScore(score + 50);
          } else {
            setCurrentExplanation(`❌ Not optimal. Binary search should start from middle position (${middle})`);
          }
        } else if (algorithm === 'linear') {
          if (array[index] === target) {
            setFoundElement(index);
            setCurrentExplanation(`🎉 Found ${target} at position ${index}!`);
            setScore(score + Math.max(50 - index * 5, 10));
          } else {
            setCheckedElements([...checkedElements, index]);
            setCurrentExplanation(`❌ ${array[index]} ≠ ${target}. Keep searching!`);
          }
        }
      }
    }
  };

  return (
    <div className="array-explorer">
      <div className="header">
        <h2>🔍 Array Explorer</h2>
        <p>Master search algorithms through interactive exploration</p>
      </div>

      <div className="game-controls">
        <div className="mode-selector">
          <label>Game Mode:</label>
          <div className="mode-buttons">
            <button 
              className={gameMode === 'guided' ? 'active' : ''}
              onClick={() => setGameMode('guided')}
            >
              🎯 Guided Tour
            </button>
            <button 
              className={gameMode === 'challenge' ? 'active' : ''}
              onClick={() => setGameMode('challenge')}
            >
              🏆 Challenge Mode
            </button>
          </div>
          
          {gameMode === 'challenge' && (
            <div className="challenge-type">
              <label>Challenge Type:</label>
              <select 
                value={challengeType} 
                onChange={(e) => setChallengeType(e.target.value)}
                disabled={isSearching}
              >
                <option value="predict">🔮 Predict Next</option>
                <option value="optimize">⚡ Optimize Search</option>
                <option value="race">🏃 Speed Race</option>
              </select>
            </div>
          )}
        </div>

        {gameMode === 'challenge' && (
          <div className="game-stats">
            <div className="stat">
              <span className="stat-label">Score:</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Attempts:</span>
              <span className="stat-value">{attempts}</span>
            </div>
          </div>
        )}
      </div>

      <div className="algorithm-info">
        <div className="current-algorithm">
          <h3>{algorithmInfo[algorithm].name}</h3>
          <p><strong>Time Complexity:</strong> {algorithmInfo[algorithm].complexity}</p>
          <p>{algorithmInfo[algorithm].description}</p>
          <div className="complexity-details">
            <div className="complexity-item">
              <strong>Best Case:</strong> {algorithmInfo[algorithm].bestCase}
            </div>
            <div className="complexity-item">
              <strong>Worst Case:</strong> {algorithmInfo[algorithm].worstCase}
            </div>
          </div>
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
          <label>Search Algorithm:</label>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isSearching && !isPaused}
          >
            <option value="linear">Linear Search</option>
            <option value="binary">Binary Search</option>
            <option value="twoPointer">Two Pointer Search</option>
          </select>
        </div>

        <div className="control-group">
          <label>Animation Speed:</label>
          <select 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSearching && !isPaused}
          >
            <option value="1200">Slow</option>
            <option value="800">Normal</option>
            <option value="400">Fast</option>
          </select>
        </div>

        <div className="control-buttons">
          <button onClick={generateNewArray} disabled={isSearching && !isPaused}>
            New Array
          </button>
          
          {gameMode === 'guided' && (
            <>
              {!isSearching ? (
                <button onClick={startSearch} className="primary">
                  Start Search
                </button>
              ) : (
                <>
                  {!isPaused ? (
                    <button onClick={pauseSearch}>Pause</button>
                  ) : (
                    <button onClick={startSearch} className="primary">Resume</button>
                  )}
                </>
              )}
            </>
          )}
          
          <button onClick={resetSearch} disabled={!isSearching && currentStep === 0}>
            Reset
          </button>
        </div>
      </div>

      <div className="search-target">
        <h3>
          {algorithm === 'twoPointer' ? 
            `🎯 Find pair that sums to: ${target}` : 
            `🎯 Searching for: ${target}`
          }
        </h3>
        
        {gameMode === 'challenge' && (
          <div className="challenge-instructions">
            {algorithm === 'twoPointer' && challengeType === 'optimize' && (
              <p>💡 Click TWO elements that sum to {target}</p>
            )}
            {algorithm !== 'twoPointer' && challengeType === 'predict' && (
              <p>🔮 Predict which element the algorithm will check next!</p>
            )}
            {challengeType === 'optimize' && algorithm !== 'twoPointer' && (
              <p>⚡ {algorithm === 'binary' ? 'Click the optimal starting position!' : 'Find the target in minimum steps!'}</p>
            )}
            {challengeType === 'race' && (
              <p>🏃 Find the target faster than the algorithm!</p>
            )}
          </div>
        )}
      </div>

      <div className="visualization">
        <div className="array-display">
          {array.map((value, index) => (
            <div 
              key={`${index}-${value}`}
              className={getElementClass(index, value)}
              onClick={() => handleManualSearch(index)}
              style={{ 
                cursor: gameMode === 'challenge' && !isSearching ? 'pointer' : 'default',
                height: `${Math.max(value * 3, 30)}px`
              }}
            >
              <span className="value">{value}</span>
              <span className="index">[{index}]</span>
              
              {algorithm === 'twoPointer' && searchSteps[currentStep - 1]?.pointers && (
                <>
                  {index === searchSteps[currentStep - 1].pointers.left && (
                    <div className="pointer-label left">L</div>
                  )}
                  {index === searchSteps[currentStep - 1].pointers.right && (
                    <div className="pointer-label right">R</div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-color checked"></div>
            <span>Checked</span>
          </div>
          <div className="legend-item">
            <div className="legend-color in-range"></div>
            <span>Search Range</span>
          </div>
          <div className="legend-item">
            <div className="legend-color found"></div>
            <span>Found</span>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <span>Selected</span>
          </div>
          {algorithm === 'twoPointer' && (
            <>
              <div className="legend-item">
                <div className="legend-color left-pointer"></div>
                <span>Left Pointer</span>
              </div>
              <div className="legend-item">
                <div className="legend-color right-pointer"></div>
                <span>Right Pointer</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="explanation-panel">
        <div className="current-step">
          <h4>
            {searchSteps.length > 0 ? 
              `Step ${currentStep} of ${searchSteps.length}` : 
              'Ready to Start'
            }
          </h4>
          <p>{currentExplanation}</p>
        </div>
        
        {isSearching && searchSteps.length > 0 && (
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentStep / searchSteps.length) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      <div className="educational-content">
        <div className="concept-explanation">
          <h3>Key Concepts</h3>
          <div className="concepts">
            <div className="concept">
              <h4>🔍 Linear Search</h4>
              <p>Simple but thorough - checks every element sequentially. Works on any array, sorted or unsorted.</p>
              <div className="complexity-badge linear">O(n)</div>
            </div>
            <div className="concept">
              <h4>⚡ Binary Search</h4>
              <p>Lightning fast but requires sorted array. Eliminates half the search space in each step.</p>
              <div className="complexity-badge binary">O(log n)</div>
            </div>
            <div className="concept">
              <h4>👫 Two Pointer</h4>
              <p>Efficient for finding pairs or ranges. Uses two pointers moving strategically through the array.</p>
              <div className="complexity-badge two-pointer">O(n)</div>
            </div>
          </div>
        </div>

        <div className="performance-comparison">
          <h3>Performance Comparison</h3>
          <div className="comparison-table">
            <div className="comparison-row header">
              <span>Algorithm</span>
              <span>Array Size: 10</span>
              <span>Array Size: 100</span>
              <span>Array Size: 1000</span>
            </div>
            <div className="comparison-row">
              <span>Linear Search</span>
              <span>~5 steps</span>
              <span>~50 steps</span>
              <span>~500 steps</span>
            </div>
            <div className="comparison-row">
              <span>Binary Search</span>
              <span>~3 steps</span>
              <span>~7 steps</span>
              <span>~10 steps</span>
            </div>
          </div>
        </div>

        {gameMode === 'challenge' && (
          <div className="challenge-tips">
            <h3>🏆 Challenge Tips</h3>
            <ul>
              <li>🔮 <strong>Predict Next:</strong> Think like the algorithm - what element would it check next?</li>
              <li>⚡ <strong>Optimize Search:</strong> Find the best strategy for each algorithm</li>
              <li>🏃 <strong>Speed Race:</strong> Beat the algorithm's speed by making smart choices</li>
              <li>👫 <strong>Two Pointer:</strong> Select TWO elements that add up to the target</li>
              <li>⭐ Higher scores for fewer attempts and better predictions!</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayExplorer;