import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './QueueQuestStyles.scss';

const QueueQuest = () => {
  const [queue, setQueue] = useState([]);
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
    const operations = ['enqueue', 'dequeue', 'front', 'rear'];
    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    setTargetOperation(randomOp);
  };

  const enqueueToQueue = () => {
    if (inputValue.trim() !== '') {
      const newElement = inputValue.trim();
      const newQueue = [...queue, newElement];
      setQueue(newQueue);
      setOperationHistory([...operationHistory, `Enqueued: ${newElement}`]);
      setInputValue('');
      
      // Check if this matches the target operation
      if (targetOperation === 'enqueue') {
        setScore(score + level * 10);
        setFeedback('Correct! You enqueued the element.');
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

  const dequeueFromQueue = () => {
    if (queue.length > 0) {
      const dequeuedElement = queue[0];
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      setOperationHistory([...operationHistory, `Dequeued: ${dequeuedElement}`]);
      
      // Check if this matches the target operation
      if (targetOperation === 'dequeue') {
        setScore(score + level * 10);
        setFeedback('Correct! You dequeued the element.');
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

  const getFrontElement = () => {
    if (queue.length > 0) {
      const frontElement = queue[0];
      setOperationHistory([...operationHistory, `Front: ${frontElement}`]);
      
      // Check if this matches the target operation
      if (targetOperation === 'front') {
        setScore(score + level * 10);
        setFeedback('Correct! You accessed the front element.');
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

  const getRearElement = () => {
    if (queue.length > 0) {
      const rearElement = queue[queue.length - 1];
      setOperationHistory([...operationHistory, `Rear: ${rearElement}`]);
      
      // Check if this matches the target operation
      if (targetOperation === 'rear') {
        setScore(score + level * 10);
        setFeedback('Correct! You accessed the rear element.');
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

  const resetQueue = () => {
    setQueue([]);
    setOperationHistory([]);
    setLevel(1);
    setScore(0);
    generateTargetOperation();
  };

  return (
    <div className="queue-quest">
      <Navbar />
      <div className="container">
        <h2>🚶‍♂️ Queue Quest</h2>
        
        <div className="game-info">
          <div className="stats">
            <span>Level: {level}</span>
            <span>Score: {score}</span>
            <span>Target: {targetOperation}</span>
          </div>
        </div>

        <div className="queue-visualizer">
          <h3>Queue Operations (FIFO - First In, First Out)</h3>
          <div className="queue-container">
            <div className="queue-track">
              <div className="queue-entrance">Entrance</div>
              {queue.length === 0 ? (
                <div className="empty-queue">Queue is empty</div>
              ) : (
                queue.map((element, index) => (
                  <div 
                    key={index} 
                    className={`queue-element ${index === 0 ? 'front-element' : ''} ${index === queue.length - 1 ? 'rear-element' : ''}`}
                  >
                    {element}
                  </div>
                ))
              )}
              <div className="queue-exit">Exit</div>
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="input-section">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value to enqueue"
              onKeyPress={(e) => e.key === 'Enter' && enqueueToQueue()}
            />
            <button onClick={enqueueToQueue} className="btn-enqueue">
              Enqueue
            </button>
          </div>

          <div className="operation-buttons">
            <button onClick={dequeueFromQueue} className="btn-dequeue" disabled={queue.length === 0}>
              Dequeue
            </button>
            <button onClick={getFrontElement} className="btn-front" disabled={queue.length === 0}>
              Front
            </button>
            <button onClick={getRearElement} className="btn-rear" disabled={queue.length === 0}>
              Rear
            </button>
            <button onClick={resetQueue} className="btn-reset">
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
          <h3>Queue Concepts:</h3>
          <ul>
            <li><strong>FIFO (First In, First Out):</strong> First element added is first to be removed</li>
            <li><strong>Enqueue:</strong> Add element to the rear of queue</li>
            <li><strong>Dequeue:</strong> Remove element from the front of queue</li>
            <li><strong>Front:</strong> Access the first element without removing it</li>
            <li><strong>Rear:</strong> Access the last element without removing it</li>
            <li><strong>Time Complexity:</strong> O(1) for all operations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QueueQuest;