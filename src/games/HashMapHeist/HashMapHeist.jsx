import React, { useState, useEffect } from 'react';
import './HashMapHeistStyles.scss';

const HashMapHeist = () => {
  const [array, setArray] = useState([]);
  const [hashMap, setHashMap] = useState(new Map());
  const [target, setTarget] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    generateArray();
  }, [level]);

  const generateArray = () => {
    const size = Math.min(10, 5 + Math.floor(level / 2));
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 10) + 1);
    setArray(newArray);
    setHashMap(new Map());
    setTarget(Math.floor(Math.random() * 20) + 10);
    setIsAnimating(false);
  };

  const buildHashMap = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newHashMap = new Map();
    
    array.forEach((value, index) => {
      setTimeout(() => {
        if (newHashMap.has(value)) {
          newHashMap.set(value, newHashMap.get(value) + 1);
        } else {
          newHashMap.set(value, 1);
        }
        setHashMap(new Map(newHashMap));
      }, index * 300);
    });
    
    setTimeout(() => {
      setIsAnimating(false);
    }, array.length * 300 + 500);
  };

  const findDuplicates = () => {
    const duplicates = [];
    hashMap.forEach((count, value) => {
      if (count > 1) {
        duplicates.push(value);
      }
    });
    return duplicates;
  };

  const findFrequency = (value) => {
    return hashMap.get(value) || 0;
  };

  const findPairSum = () => {
    const pairs = [];
    const seen = new Set();
    
    array.forEach((value) => {
      const complement = target - value;
      if (seen.has(complement)) {
        pairs.push([complement, value]);
      }
      seen.add(value);
    });
    
    return pairs;
  };

  const findAnagrams = () => {
    const anagramGroups = new Map();
    
    array.forEach((value) => {
      const sorted = value.toString().split('').sort().join('');
      if (!anagramGroups.has(sorted)) {
        anagramGroups.set(sorted, []);
      }
      anagramGroups.get(sorted).push(value);
    });
    
    return Array.from(anagramGroups.values()).filter(group => group.length > 1);
  };

  const getHashMapEntries = () => {
    return Array.from(hashMap.entries());
  };

  return (
    <div className="hashmap-heist">
      <h2>🎯 HashMap Heist</h2>
      
      <div className="game-info">
        <div className="stats">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
          <span>Target Sum: {target}</span>
        </div>
      </div>

      <div className="array-section">
        <h3>Array:</h3>
        <div className="array-display">
          {array.map((value, index) => (
            <div key={index} className="array-element">
              {value}
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button onClick={buildHashMap} disabled={isAnimating}>
          Build HashMap
        </button>
        <button onClick={generateArray} disabled={isAnimating}>
          New Array
        </button>
      </div>

      <div className="hashmap-section">
        <h3>HashMap:</h3>
        <div className="hashmap-display">
          {getHashMapEntries().map(([key, value]) => (
            <div key={key} className="hashmap-entry">
              <span className="key">{key}</span>
              <span className="arrow">→</span>
              <span className="value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="analysis-section">
        <div className="analysis-item">
          <h4>Duplicates:</h4>
          <div className="result-list">
            {findDuplicates().map((value, index) => (
              <span key={index} className="result-item">
                {value} (freq: {findFrequency(value)})
              </span>
            ))}
          </div>
        </div>

        <div className="analysis-item">
          <h4>Pairs that sum to {target}:</h4>
          <div className="result-list">
            {findPairSum().map((pair, index) => (
              <span key={index} className="result-item">
                ({pair[0]}, {pair[1]})
              </span>
            ))}
          </div>
        </div>

        <div className="analysis-item">
          <h4>Anagram Groups:</h4>
          <div className="result-list">
            {findAnagrams().map((group, index) => (
              <span key={index} className="result-item">
                [{group.join(', ')}]
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="frequency-checker">
        <h3>Check Frequency:</h3>
        <div className="frequency-input">
          <input
            type="number"
            placeholder="Enter number"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  const freq = findFrequency(value);
                  alert(`Frequency of ${value}: ${freq}`);
                  e.target.value = '';
                }
              }
            }}
          />
          <button onClick={() => {
            const input = document.querySelector('.frequency-input input');
            const value = parseInt(input.value);
            if (!isNaN(value)) {
              const freq = findFrequency(value);
              alert(`Frequency of ${value}: ${freq}`);
              input.value = '';
            }
          }}>
            Check
          </button>
        </div>
      </div>

      <div className="explanation">
        <h3>HashMap Applications:</h3>
        <ul>
          <li><strong>Frequency Count:</strong> Track how many times each element appears</li>
          <li><strong>Duplicate Detection:</strong> Find elements that appear more than once</li>
          <li><strong>Pair Sum:</strong> Find pairs that sum to a target value</li>
          <li><strong>Anagram Groups:</strong> Group elements that are anagrams of each other</li>
          <li><strong>Time Complexity:</strong> O(1) average case for insertions and lookups</li>
        </ul>
      </div>
    </div>
  );
};

export default HashMapHeist; 