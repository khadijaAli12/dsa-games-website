import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './HeapHeroesStyles.scss';

const HeapHeroes = () => {
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operationHistory, setOperationHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetOperation, setTargetOperation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [heapType, setHeapType] = useState('min'); // min or max heap

  useEffect(() => {
    generateTargetOperation();
  }, [level]);

  const generateTargetOperation = () => {
    const operations = ['insert', 'extract', 'peek', 'heapify'];
    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    setTargetOperation(randomOp);
  };

  const insertIntoHeap = () => {
    if (inputValue.trim() !== '') {
      const newElement = parseInt(inputValue.trim());
      if (isNaN(newElement)) {
        setFeedback('Please enter a valid number');
        setTimeout(() => setFeedback(''), 1500);
        return;
      }

      const newHeap = [...heap, newElement];
      setHeap(heapifyUp(newHeap));
      setOperationHistory([...operationHistory, `Inserted: ${newElement}`]);
      setInputValue('');
      
      // Check if this matches the target operation
      if (targetOperation === 'insert') {
        setScore(score + level * 10);
        setFeedback('Correct! You inserted the element.');
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

  const extractFromHeap = () => {
    if (heap.length > 0) {
      const extractedValue = heap[0]; // Root of the heap
      const newHeap = [...heap.slice(1)];
      setHeap(heapifyDown(newHeap));
      setOperationHistory([...operationHistory, `Extracted: ${extractedValue}`]);
      
      // Check if this matches the target operation
      if (targetOperation === 'extract') {
        setScore(score + level * 10);
        setFeedback('Correct! You extracted the root element.');
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

  const peekHeap = () => {
    if (heap.length > 0) {
      const rootElement = heap[0];
      setOperationHistory([...operationHistory, `Peeked: ${rootElement}`]);
      
      // Check if this matches the target operation
      if (targetOperation === 'peek') {
        setScore(score + level * 10);
        setFeedback('Correct! You peeked the root element.');
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

  const heapifyUp = (arr) => {
    // Min-heap implementation
    const result = [...arr];
    let index = result.length - 1;
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (heapType === 'min' ? result[parentIndex] <= result[index] : result[parentIndex] >= result[index]) {
        break;
      }
      
      // Swap
      [result[parentIndex], result[index]] = [result[index], result[parentIndex]];
      index = parentIndex;
    }
    
    return result;
  };

  const heapifyDown = (arr) => {
    // Min-heap implementation
    const result = [...arr];
    let index = 0;
    
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      
      if (leftChild < result.length && 
          (heapType === 'min' ? result[leftChild] < result[smallest] : result[leftChild] > result[smallest])) {
        smallest = leftChild;
      }
      
      if (rightChild < result.length && 
          (heapType === 'min' ? result[rightChild] < result[smallest] : result[rightChild] > result[smallest])) {
        smallest = rightChild;
      }
      
      if (smallest === index) {
        break;
      }
      
      // Swap
      [result[smallest], result[index]] = [result[index], result[smallest]];
      index = smallest;
    }
    
    return result;
  };

  const resetHeap = () => {
    setHeap([]);
    setOperationHistory([]);
    setLevel(1);
    setScore(0);
    generateTargetOperation();
  };

  const toggleHeapType = () => {
    setHeapType(heapType === 'min' ? 'max' : 'min');
    setHeap(heapifyDown([...heap])); // Re-heapify with new type
  };

  return (
    <div className="heap-heroes">
      <Navbar />
      <div className="container">
        <h2>🦸‍♂️ Heap Heroes</h2>
        
        <div className="game-info">
          <div className="stats">
            <span>Level: {level}</span>
            <span>Score: {score}</span>
            <span>Target: {targetOperation}</span>
            <span>Type: {heapType} heap</span>
          </div>
          
          <div className="heap-type-toggle">
            <button onClick={toggleHeapType} className="btn-toggle">
              Switch to {heapType === 'min' ? 'Max' : 'Min'} Heap
            </button>
          </div>
        </div>

        <div className="heap-visualizer">
          <h3>{heapType === 'min' ? 'Min' : 'Max'} Heap Structure</h3>
          <div className="heap-container">
            {heap.length === 0 ? (
              <div className="empty-heap">Heap is empty</div>
            ) : (
              <div className="heap-tree">
                <div className="heap-root">
                  {heap[0]}
                </div>
                
                {heap.length > 1 && (
                  <div className="heap-children">
                    {heap.slice(1).map((value, index) => (
                      <div key={index + 1} className="heap-node">
                        {value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="controls">
          <div className="input-section">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter number to insert"
              onKeyPress={(e) => e.key === 'Enter' && insertIntoHeap()}
            />
            <button onClick={insertIntoHeap} className="btn-insert">
              Insert
            </button>
          </div>

          <div className="operation-buttons">
            <button onClick={extractFromHeap} className="btn-extract" disabled={heap.length === 0}>
              Extract Root
            </button>
            <button onClick={peekHeap} className="btn-peek" disabled={heap.length === 0}>
              Peek Root
            </button>
            <button onClick={resetHeap} className="btn-reset">
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
          <h3>Heap Concepts:</h3>
          <ul>
            <li><strong>Min Heap:</strong> Parent node is smaller than children (root = minimum)</li>
            <li><strong>Max Heap:</strong> Parent node is greater than children (root = maximum)</li>
            <li><strong>Insert:</strong> Add element and heapify up</li>
            <li><strong>Extract Root:</strong> Remove root and heapify down</li>
            <li><strong>Peek:</strong> View root element without removing</li>
            <li><strong>Time Complexity:</strong> Insert O(log n), Extract O(log n), Peek O(1)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeapHeroes;