import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './RegexRunnerStyles.scss';

const RegexRunner = () => {
  const [inputText, setInputText] = useState('');
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('g');
  const [matches, setMatches] = useState([]);
  const [operationHistory, setOperationHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetChallenge, setTargetChallenge] = useState('');
  const [feedback, setFeedback] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');

  useEffect(() => {
    generateTargetChallenge();
  }, [level]);

  const generateTargetChallenge = () => {
    const challenges = [
      { type: 'email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', description: 'Find email addresses' },
      { type: 'phone', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', description: 'Find phone numbers' },
      { type: 'url', pattern: 'https?://(?:[-\\w.])+(?:[:\\d]+)?(?:/(?:[~\\w/\\.])*(?:\\?(?:[\\w&=%.\\-]*))?(?:#(?:[\\w.]*))?)?', description: 'Find URLs' },
      { type: 'date', pattern: '\\d{1,2}/\\d{1,2}/\\d{4}', description: 'Find dates (MM/DD/YYYY)' },
      { type: 'ip', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', description: 'Find IP addresses' },
      { type: 'word', pattern: '\\b\\w+\\b', description: 'Find whole words' },
      { type: 'number', pattern: '\\d+', description: 'Find numbers' },
      { type: 'hashtag', pattern: '#\\w+', description: 'Find hashtags' }
    ];
    
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setTargetChallenge(randomChallenge.type);
    setChallengeDescription(randomChallenge.description);
    setRegexPattern(randomChallenge.pattern);
  };

  const runRegex = () => {
    if (!inputText || !regexPattern) {
      setFeedback('Please enter both text and regex pattern');
      setTimeout(() => setFeedback(''), 1500);
      return;
    }

    try {
      const regex = new RegExp(regexPattern, regexFlags);
      const foundMatches = inputText.match(regex) || [];
      setMatches(foundMatches);
      
      setOperationHistory([
        ...operationHistory,
        `Matched "${regexPattern}" in text - Found ${foundMatches.length} matches`
      ]);

      // Check if this matches the target challenge
      if (targetChallenge) {
        setScore(score + level * 10);
        setFeedback(`Correct! You matched ${targetChallenge} patterns.`);
        setTimeout(() => {
          setLevel(level + 1);
          setFeedback('');
        }, 1500);
      }
    } catch (error) {
      setFeedback(`Invalid regex pattern: ${error.message}`);
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  const resetGame = () => {
    setInputText('');
    setRegexPattern('');
    setMatches([]);
    setOperationHistory([]);
    setLevel(1);
    setScore(0);
    generateTargetChallenge();
  };

  const commonPatterns = [
    { pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', name: 'Email' },
    { pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', name: 'Phone Number' },
    { pattern: 'https?://(?:[-\\w.])+(?:[:\\d]+)?(?:/(?:[~\\w/\\.])*(?:\\?(?:[\\w&=%.\\-]*))?(?:#(?:[\\w.]*))?)?', name: 'URL' },
    { pattern: '\\d{1,2}/\\d{1,2}/\\d{4}', name: 'Date (MM/DD/YYYY)' },
    { pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', name: 'IP Address' },
    { pattern: '#\\w+', name: 'Hashtag' },
    { pattern: '@\\w+', name: 'Username' },
    { pattern: '\\$(\\d+,?)+(\\.\\d{2})?', name: 'Price ($XX.XX)' }
  ];

  const applyCommonPattern = (pattern) => {
    setRegexPattern(pattern);
  };

  return (
    <div className="regex-runner">
      <Navbar />
      <div className="container">
        <h2>🏃‍♂️ Regex Runner</h2>
        
        <div className="game-info">
          <div className="stats">
            <span>Level: {level}</span>
            <span>Score: {score}</span>
            <span>Challenge: {challengeDescription}</span>
          </div>
        </div>

        <div className="regex-inputs">
          <div className="input-group">
            <label htmlFor="inputText">Input Text:</label>
            <textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to search in..."
              rows="5"
            />
          </div>

          <div className="input-group">
            <label htmlFor="regexPattern">Regex Pattern:</label>
            <input
              id="regexPattern"
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              placeholder="Enter regex pattern..."
            />
          </div>

          <div className="input-group">
            <label htmlFor="regexFlags">Regex Flags:</label>
            <select
              id="regexFlags"
              value={regexFlags}
              onChange={(e) => setRegexFlags(e.target.value)}
            >
              <option value="g">Global (g)</option>
              <option value="gi">Global + Insensitive (gi)</option>
              <option value="i">Insensitive (i)</option>
              <option value="m">Multiline (m)</option>
              <option value="s">Dotall (s)</option>
            </select>
          </div>
        </div>

        <div className="common-patterns">
          <h3>Common Patterns:</h3>
          <div className="patterns-grid">
            {commonPatterns.map((patternObj, index) => (
              <button
                key={index}
                className="pattern-btn"
                onClick={() => applyCommonPattern(patternObj.pattern)}
              >
                {patternObj.name}
              </button>
            ))}
          </div>
        </div>

        <div className="controls">
          <button onClick={runRegex} className="btn-run">
            Run Regex
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

        {matches.length > 0 && (
          <div className="search-results">
            <h3>Matches Found:</h3>
            <div className="matches-container">
              {matches.map((match, index) => (
                <div key={index} className="match-item">
                  {match}
                </div>
              ))}
            </div>
            <p>Total matches: {matches.length}</p>
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

        <div className="regex-reference">
          <h3>Regex Reference:</h3>
          <div className="reference-grid">
            <div className="reference-item">
              <code>\d</code>
              <span>Digit (0-9)</span>
            </div>
            <div className="reference-item">
              <code>\w</code>
              <span>Word character</span>
            </div>
            <div className="reference-item">
              <code>\s</code>
              <span>Whitespace</span>
            </div>
            <div className="reference-item">
              <code>.</code>
              <span>Any character</span>
            </div>
            <div className="reference-item">
              <code>*</code>
              <span>Zero or more</span>
            </div>
            <div className="reference-item">
              <code>+</code>
              <span>One or more</span>
            </div>
            <div className="reference-item">
              <code>?</code>
              <span>Zero or one</span>
            </div>
            <div className="reference-item">
              <code>[abc]</code>
              <span>Character set</span>
            </div>
            <div className="reference-item">
              <code>(...)</code>
              <span>Group</span>
            </div>
            <div className="reference-item">
              <code>^</code>
              <span>Start of string</span>
            </div>
            <div className="reference-item">
              <code>$</code>
              <span>End of string</span>
            </div>
            <div className="reference-item">
              <code>|</code>
              <span>OR operator</span>
            </div>
          </div>
        </div>

        <div className="explanation">
          <h3>Regular Expressions Concepts:</h3>
          <ul>
            <li><strong>Pattern Matching:</strong> Sequences of characters that define a search pattern</li>
            <li><strong>Applications:</strong> Text validation, parsing, search and replace operations</li>
            <li><strong>Quantifiers:</strong> Specify how many times a character/group can occur</li>
            <li><strong>Character Classes:</strong> Match any one of a set of characters</li>
            <li><strong>Anchors:</strong> Match positions in the text (start, end, word boundaries)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegexRunner;