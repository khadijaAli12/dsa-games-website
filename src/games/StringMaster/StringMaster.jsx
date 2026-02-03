import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './StringMasterStyles.scss';

const StringMaster = () => {
  const [inputString, setInputString] = useState('');
  const [pattern, setPattern] = useState('');
  const [algorithm, setAlgorithm] = useState('kmp');
  const [matches, setMatches] = useState([]);
  const [operationHistory, setOperationHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetAlgorithm, setTargetAlgorithm] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateTargetAlgorithm();
  }, [level]);

  const generateTargetAlgorithm = () => {
    const algorithms = ['kmp', 'boyer-moore', 'rabin-karp'];
    const randomAlgo = algorithms[Math.floor(Math.random() * algorithms.length)];
    setTargetAlgorithm(randomAlgo);
  };

  const runKMP = (text, pattern) => {
    if (!text || !pattern) return [];
    const lps = computeLPS(pattern);
    const matches = [];
    let i = 0, j = 0;

    while (i < text.length) {
      if (pattern[j] === text[i]) {
        i++;
        j++;
      }

      if (j === pattern.length) {
        matches.push(i - j);
        j = lps[j - 1];
      } else if (i < text.length && pattern[j] !== text[i]) {
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i++;
        }
      }
    }
    return matches;
  };

  const computeLPS = (pattern) => {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        i++;
      } else {
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }
    return lps;
  };

  const runBoyerMoore = (text, pattern) => {
    if (!text || !pattern) return [];
    const matches = [];
    const badChar = new Array(256).fill(-1);
    
    for (let i = 0; i < pattern.length; i++) {
      badChar[pattern.charCodeAt(i)] = i;
    }

    let shift = 0;
    while (shift <= text.length - pattern.length) {
      let j = pattern.length - 1;

      while (j >= 0 && pattern[j] === text[shift + j]) {
        j--;
      }

      if (j < 0) {
        matches.push(shift);
        shift += (shift + pattern.length < text.length) ? 
          pattern.length - badChar[text.charCodeAt(shift + pattern.length)] : 1;
      } else {
        shift += Math.max(1, j - badChar[text.charCodeAt(shift + j)]);
      }
    }
    return matches;
  };

  const runRabinKarp = (text, pattern) => {
    if (!text || !pattern) return [];
    const matches = [];
    const prime = 101;
    const d = 256;
    const patLen = pattern.length;
    const txtLen = text.length;
    let patHash = 0;
    let txtHash = 0;
    let h = 1;

    for (let i = 0; i < patLen - 1; i++) {
      h = (h * d) % prime;
    }

    for (let i = 0; i < patLen; i++) {
      patHash = (d * patHash + pattern.charCodeAt(i)) % prime;
      txtHash = (d * txtHash + text.charCodeAt(i)) % prime;
    }

    for (let i = 0; i <= txtLen - patLen; i++) {
      if (patHash === txtHash) {
        let j;
        for (j = 0; j < patLen; j++) {
          if (text[i + j] !== pattern[j]) {
            break;
          }
        }
        if (j === patLen) {
          matches.push(i);
        }
      }

      if (i < txtLen - patLen) {
        txtHash = (d * (txtHash - text.charCodeAt(i) * h) + text.charCodeAt(i + patLen)) % prime;
        if (txtHash < 0) {
          txtHash += prime;
        }
      }
    }
    return matches;
  };

  const searchPattern = () => {
    if (!inputString || !pattern) {
      setFeedback('Please enter both text and pattern');
      setTimeout(() => setFeedback(''), 1500);
      return;
    }

    let results = [];
    switch (algorithm) {
      case 'kmp':
        results = runKMP(inputString, pattern);
        break;
      case 'boyer-moore':
        results = runBoyerMoore(inputString, pattern);
        break;
      case 'rabin-karp':
        results = runRabinKarp(inputString, pattern);
        break;
      default:
        results = [];
    }

    setMatches(results);
    setOperationHistory([
      ...operationHistory,
      `Searched "${pattern}" in "${inputString}" using ${algorithm.toUpperCase()} - Found ${results.length} matches`
    ]);

    // Check if this matches the target algorithm
    if (algorithm === targetAlgorithm) {
      setScore(score + level * 10);
      setFeedback(`Correct! You used the ${algorithm.toUpperCase()} algorithm.`);
      setTimeout(() => {
        setLevel(level + 1);
        setFeedback('');
      }, 1500);
    } else {
      setFeedback('Wrong algorithm for this challenge!');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  const resetGame = () => {
    setInputString('');
    setPattern('');
    setMatches([]);
    setOperationHistory([]);
    setLevel(1);
    setScore(0);
    generateTargetAlgorithm();
  };

  const highlightMatches = (text, matches, pattern) => {
    if (matches.length === 0) return text;

    let result = [];
    let lastIndex = 0;

    matches.forEach(matchIndex => {
      // Add text before match
      if (matchIndex > lastIndex) {
        result.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex, matchIndex)}</span>);
      }
      // Add highlighted match
      result.push(
        <span key={`match-${matchIndex}`} className="highlight-match">
          {text.substring(matchIndex, matchIndex + pattern.length)}
        </span>
      );
      lastIndex = matchIndex + pattern.length;
    });

    // Add remaining text after last match
    if (lastIndex < text.length) {
      result.push(<span key={`text-end-${lastIndex}`}>{text.substring(lastIndex)}</span>);
    }

    return result;
  };

  return (
    <div className="string-master">
      <Navbar />
      <div className="container">
        <h2>🔍 String Master</h2>
        
        <div className="game-info">
          <div className="stats">
            <span>Level: {level}</span>
            <span>Score: {score}</span>
            <span>Target: {targetAlgorithm.toUpperCase()}</span>
          </div>
        </div>

        <div className="string-inputs">
          <div className="input-group">
            <label htmlFor="inputString">Input Text:</label>
            <textarea
              id="inputString"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              placeholder="Enter your text here..."
              rows="4"
            />
          </div>

          <div className="input-group">
            <label htmlFor="pattern">Pattern to Search:</label>
            <input
              id="pattern"
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter pattern to search..."
            />
          </div>

          <div className="input-group">
            <label htmlFor="algorithm">Search Algorithm:</label>
            <select
              id="algorithm"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="kmp">KMP (Knuth-Morris-Pratt)</option>
              <option value="boyer-moore">Boyer-Moore</option>
              <option value="rabin-karp">Rabin-Karp</option>
            </select>
          </div>
        </div>

        <div className="controls">
          <button onClick={searchPattern} className="btn-search">
            Search Pattern
          </button>
          <button onClick={resetGame} className="btn-reset">
            Reset
          </button>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.includes('Correct') ? 'success' : 'error'}`}>
            {feedback}
          </div>
        )}

        {inputString && pattern && (
          <div className="search-results">
            <h3>Search Results:</h3>
            <div className="highlighted-text">
              {highlightMatches(inputString, matches, pattern)}
            </div>
            
            <div className="match-info">
              <p>Pattern "{pattern}" found at positions: {matches.join(', ') || 'None'}</p>
              <p>Total matches: {matches.length}</p>
            </div>
          </div>
        )}

        <div className="operation-history">
          <h3>Operation History:</h3>
          <div className="history-list">
            {operationHistory.slice(-5).map((op, index) => (
              <div key={index} className="history-item">{op}</div>
            ))}
          </div>
        </div>

        <div className="algorithm-info">
          <h3>Algorithm Details:</h3>
          <div className="algorithm-details">
            <div className={`algorithm-detail ${algorithm === 'kmp' ? 'active' : ''}`}>
              <h4>KMP (Knuth-Morris-Pratt)</h4>
              <p>Time Complexity: O(n + m) where n is text length and m is pattern length</p>
              <p>Preprocesses the pattern to create an LPS (Longest Proper Prefix which is also Suffix) array to avoid redundant comparisons.</p>
            </div>
            
            <div className={`algorithm-detail ${algorithm === 'boyer-moore' ? 'active' : ''}`}>
              <h4>Boyer-Moore</h4>
              <p>Time Complexity: O(n/m) average case, O(nm) worst case</p>
              <p>Starts matching from the end of the pattern and uses bad character and good suffix heuristics to skip characters.</p>
            </div>
            
            <div className={`algorithm-detail ${algorithm === 'rabin-karp' ? 'active' : ''}`}>
              <h4>Rabin-Karp</h4>
              <p>Time Complexity: O(nm) worst case, O(n+m) average case</p>
              <p>Uses hashing to find exact matches of a pattern string in a text by using a rolling hash function.</p>
            </div>
          </div>
        </div>

        <div className="explanation">
          <h3>String Matching Concepts:</h3>
          <ul>
            <li><strong>Pattern Matching:</strong> Finding occurrences of a pattern within a larger text</li>
            <li><strong>Applications:</strong> Text editors, bioinformatics, plagiarism detection</li>
            <li><strong>Naive Approach:</strong> O(n*m) time complexity by checking every possible position</li>
            <li><strong>Optimized Algorithms:</strong> Achieve better time complexities using preprocessing and skipping techniques</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StringMaster;