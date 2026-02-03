import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './StackAttackStyles.scss';

const StackAttack = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operationHistory, setOperationHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetOperation, setTargetOperation] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateTargetOperation();
  }, [level]);

  const generateTargetOperation = () => {
    const operations = ['push', 'pop', 'peek'];
    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    setTargetOperation(randomOp);
  };

  const pushToStack = () => {
    if (inputValue.trim() !== '') {
      const newElement = inputValue.trim();
      const newStack = [...stack, newElement];
      setStack(newStack);
      setOperationHistory([...operationHistory, `Pushed: ${newElement}`]);
      setInputValue('');
      
      // Check if this matches the target operation
      if (targetOperation === 'push') {
        setScore(score + level * 10);
        setFeedback('Correct! You pushed the element.');
        setTimeout(() => {
          setLevel(level + 1);
          setFeedback('');
        }, 1500);
      } else {
        setFeedback('Wrong operation for this challenge!');
        setTimeout(() => setFeedback(''), 1500);
      }
    }
  };

  const popFromStack = () => {
    if (stack.length > 0) {
      const poppedElement = stack[stack.length - 1];
      const newStack = stack.slice(0, -1);
      setStack(newStack);
      setOperationHistory([...operationHistory, `Popped: ${poppedElement}`]);
      
      // Check if this matches the target operation
      if (targetOperation === 'pop') {
        setScore(score + level * 10);
        setFeedback('Correct! You popped the element.');
        setTimeout(() => {
          setLevel(level + 1);
          setFeedback('');
        }, 1500);
      } else {
        setFeedback('Wrong operation for this challenge!');
        setTimeout(() => setFeedback(''), 1500);
      }
    }
  };

  const peekStack = () => {
    if (stack.length > 0) {
      const topElement = stack[stack.length - 1];
      setOperationHistory([...operationHistory, `Peeked: ${topElement}`]);
      
      // Check if this matches the target operation
      if (targetOperation === 'peek') {
        setScore(score + level * 10);
        setFeedback('Correct! You peeked the top element.');
        setTimeout(() => {
          setLevel(level + 1);
          setFeedback('');
        }, 1500);
      } else {
        setFeedback('Wrong operation for this challenge!');
        setTimeout(() => setFeedback(''), 1500);
      }
    }
  };

  const resetStack = () => {
    setStack([]);
    setOperationHistory([]);
    setLevel(1);
    setScore(0);
    generateTargetOperation();
  };

  return (
    <div className="stack-attack">
      <Navbar />
      <div className="container">
        <h2>🏗️ Stack Attack</h2>
        
        <div className="game-info">
          <div className="stats">
            <span>Level: {level}</span>
            <span>Score: {score}</span>
            <span>Target: {targetOperation}</span>
          </div>
        </div>

        <div className="stack-visualizer">
          <h3>Stack Operations</h3>
          <div className="stack-container">
            <div className="stack-base">
              {stack.length === 0 ? (
                <div className="empty-stack">Stack is empty</div>
              ) : (
                stack.slice().reverse().map((element, index) => (
                  <div 
                    key={index} 
                    className={`stack-element ${index === 0 ? 'top-element' : ''}`}
                  >
                    {element}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="input-section">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value to push"
              onKeyPress={(e) => e.key === 'Enter' && pushToStack()}
            />
            <button onClick={pushToStack} className="btn-push">
              Push
            </button>
          </div>

          <div className="operation-buttons">
            <button onClick={popFromStack} className="btn-pop" disabled={stack.length === 0}>
              Pop
            </button>
            <button onClick={peekStack} className="btn-peek" disabled={stack.length === 0}>
              Peek
            </button>
            <button onClick={resetStack} className="btn-reset">
              Reset
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.includes('Correct') ? 'success' : 'error'}`}>
            {feedback}
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

        <div className="explanation">
          <h3>Stack Concepts:</h3>
          <ul>
            <li><strong>LIFO (Last In, First Out):</strong> Last element added is first to be removed</li>
            <li><strong>Push:</strong> Add element to top of stack</li>
            <li><strong>Pop:</strong> Remove element from top of stack</li>
            <li><strong>Peek/Top:</strong> View top element without removing it</li>
            <li><strong>Time Complexity:</strong> O(1) for all operations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StackAttack;