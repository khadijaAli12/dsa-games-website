import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimeComplexityPage = () => {
  const [inputSize, setInputSize] = useState(10);
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Generate complexity data for visualization
  const generateComplexityData = (size) => {
    const data = [];
    for (let i = 1; i <= size; i++) {
      data.push({
        n: i,
        constant: 1,
        logarithmic: Math.log2(i),
        linear: i,
        nlogn: i * Math.log2(i),
        quadratic: i * i,
        exponential: Math.pow(2, Math.min(i, 10))
      });
    }
    return data;
  };

  const complexityData = generateComplexityData(inputSize);

  const complexityTypes = [
    {
      notation: "O(1)",
      name: "Constant Time",
      description: "Execution time remains constant regardless of input size",
      color: "#10b981",
      examples: ["Array access by index", "Hash table lookup", "Stack push/pop"],
      code: `function getFirst(arr) {
    return arr[0]; // Always O(1)
}

const getValue = (obj, key) => obj[key]; // O(1)`
    },
    {
      notation: "O(log n)",
      name: "Logarithmic Time",
      description: "Execution time grows logarithmically with input size",
      color: "#3b82f6",
      examples: ["Binary search", "Binary tree operations", "Heap insertion"],
      code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        arr[mid] < target ? left = mid + 1 : right = mid - 1;
    }
    return -1;
}`
    },
    {
      notation: "O(n)",
      name: "Linear Time",
      description: "Execution time grows linearly with input size",
      color: "#f59e0b",
      examples: ["Linear search", "Array traversal", "Finding max/min"],
      code: `function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}`
    },
    {
      notation: "O(n log n)",
      name: "Linearithmic Time",
      description: "Common in efficient sorting algorithms",
      color: "#8b5cf6",
      examples: ["Merge sort", "Heap sort", "Quick sort (average)"],
      code: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}`
    },
    {
      notation: "O(n²)",
      name: "Quadratic Time",
      description: "Execution time grows quadratically with input size",
      color: "#ef4444",
      examples: ["Bubble sort", "Selection sort", "Nested loops"],
      code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`
    },
    {
      notation: "O(2ⁿ)",
      name: "Exponential Time", 
      description: "Execution time doubles with each additional input",
      color: "#dc2626",
      examples: ["Recursive Fibonacci", "Tower of Hanoi", "Subset generation"],
      code: `// Avoid this approach!
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Better approach: O(n)
function fibonacciOptimal(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}`
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the time complexity of accessing an array element by index?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: "O(1)",
      explanation: "Array access by index is constant time because we can directly calculate the memory address."
    },
    {
      id: 2,
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
      correctAnswer: "Merge Sort",
      explanation: "Merge sort consistently performs at O(n log n) in all cases, making it highly efficient."
    },
    {
      id: 3,
      question: "What is the time complexity of binary search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: "O(log n)",
      explanation: "Binary search eliminates half the search space with each comparison."
    },
    {
      id: 4,
      question: "Which complexity grows the fastest?",
      options: ["O(n²)", "O(n log n)", "O(2ⁿ)", "O(n³)"],
      correctAnswer: "O(2ⁿ)",
      explanation: "Exponential time complexity grows much faster than any polynomial complexity."
    },
    {
      id: 5,
      question: "What is the time complexity of finding the maximum element in an unsorted array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: "O(n)",
      explanation: "We must examine every element to find the maximum, requiring linear time."
    }
  ];

  const handleAnswer = (selectedAnswer) => {
    setAnswers(prev => ({ 
      ...prev, 
      [quizQuestions[currentQuestionIndex].id]: selectedAnswer 
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    const correctCount = quizQuestions.filter(
      question => answers[question.id] === question.correctAnswer
    ).length;
    setScore(correctCount);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const filteredComplexities = selectedComplexity === 'all' 
    ? complexityTypes 
    : complexityTypes.filter(type => type.notation === selectedComplexity);

  return (
    <div className="time-complexity-container">
      <div className="time-complexity-page">
        
        {/* Header */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Algorithm Analysis</span>
            </div>
            <h1>Time Complexity Analysis</h1>
            <p>Master algorithm efficiency through interactive learning and visualization</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="content-section">
          <h2>Understanding Time Complexity</h2>
          <div className="content-grid">
            <div className="content-text">
              <p>
                Time complexity measures how an algorithm's runtime grows as input size increases. 
                It helps us analyze and compare algorithms independently of hardware, focusing on scalability patterns.
              </p>
            </div>
            
            <div className="info-cards">
              <div className="info-card">
                <h3>Big O Notation</h3>
                <p>Mathematical notation describing algorithm growth rate upper bounds</p>
              </div>
              <div className="info-card">
                <h3>Growth Rate</h3>
                <p>How quickly runtime increases as input size grows</p>
              </div>
              <div className="info-card">
                <h3>Worst Case</h3>
                <p>Maximum time an algorithm might take for any input</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visualization */}
        <section className="content-section">
          <h2>Growth Visualization</h2>
          <div className="content-grid">
            <div className="chart-controls">
              <label className="input-label">
                Input Size (n): {inputSize}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={inputSize}
                onChange={(e) => setInputSize(Number(e.target.value))}
                className="range-input"
              />
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complexityData}>
                  <XAxis dataKey="n" label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: 'Operations', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="constant" stroke="#10b981" strokeWidth={2} name="O(1)" />
                  <Line type="monotone" dataKey="logarithmic" stroke="#3b82f6" strokeWidth={2} name="O(log n)" />
                  <Line type="monotone" dataKey="linear" stroke="#f59e0b" strokeWidth={2} name="O(n)" />
                  <Line type="monotone" dataKey="nlogn" stroke="#8b5cf6" strokeWidth={2} name="O(n log n)" />
                  <Line type="monotone" dataKey="quadratic" stroke="#ef4444" strokeWidth={2} name="O(n²)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Complexity Types */}
        <section className="content-section">
          <h2>Complexity Types</h2>
          
          <div className="filter-buttons">
            <button 
              onClick={() => setSelectedComplexity('all')}
              className={`filter-btn ${selectedComplexity === 'all' ? 'active' : ''}`}
            >
              All Types
            </button>
            {complexityTypes.map(type => (
              <button
                key={type.notation}
                onClick={() => setSelectedComplexity(type.notation)}
                className={`filter-btn ${selectedComplexity === type.notation ? 'active' : ''}`}
              >
                {type.notation}
              </button>
            ))}
          </div>

          <div className="complexity-cards">
            {filteredComplexities.map((complexity) => (
              <div key={complexity.notation} className="complexity-card">
                <div className="complexity-header">
                  <div 
                    className="complexity-color"
                    style={{ backgroundColor: complexity.color }}
                  />
                  <span className="complexity-notation">{complexity.notation}</span>
                  <span className="complexity-name">{complexity.name}</span>
                </div>
                
                <p className="complexity-description">{complexity.description}</p>
                
                <div className="complexity-content">
                  <div className="complexity-examples">
                    <h4>Common Examples</h4>
                    <ul className="example-list">
                      {complexity.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="code-section">
                    <h4>Code Example</h4>
                    <div className="code-block">
                      <div className="code-header">
                        <span className="code-title">example.js</span>
                      </div>
                      <pre><code>{complexity.code}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="content-section">
          <h2>Test Your Knowledge</h2>
          
          {!showResults ? (
            <div className="quiz-container">
              <div className="quiz-progress">
                <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}% Complete</span>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              <div className="question-container">
                <h3 className="question-text">
                  {quizQuestions[currentQuestionIndex]?.question}
                </h3>
                
                <div className="options-grid">
                  {quizQuestions[currentQuestionIndex]?.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`option-button ${
                        answers[quizQuestions[currentQuestionIndex].id] === option ? 'selected' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                <div className="quiz-navigation">
                  <button 
                    onClick={previousQuestion} 
                    disabled={currentQuestionIndex === 0}
                    className="nav-btn secondary"
                  >
                    Previous
                  </button>
                  
                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <button 
                      onClick={nextQuestion}
                      className="nav-btn primary"
                    >
                      Next
                    </button>
                  ) : (
                    <button 
                      onClick={submitQuiz}
                      className="nav-btn success"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="results-container">
              <div className="results-header">
                <h3>Quiz Results</h3>
                <div className="results-score">
                  {score}/{quizQuestions.length}
                </div>
                <p className="results-percentage">
                  {Math.round((score / quizQuestions.length) * 100)}% Correct
                </p>
              </div>
              
              <div className="results-list">
                {quizQuestions.map((question, index) => (
                  <div key={question.id} className="question-review">
                    <div className="question-review-header">
                      <span className={`result-icon ${
                        answers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'
                      }`}>
                        {answers[question.id] === question.correctAnswer ? '✓' : '✗'}
                      </span>
                      <div className="question-review-content">
                        <p className="question-review-text">{question.question}</p>
                        <p className="answer-text">
                          <strong>Your answer:</strong> {answers[question.id] || 'Not answered'}
                        </p>
                        {answers[question.id] !== question.correctAnswer && (
                          <p className="answer-text">
                            <strong>Correct answer:</strong> {question.correctAnswer}
                          </p>
                        )}
                        <p className="explanation-text">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="retry-container">
                <button 
                  onClick={resetQuiz}
                  className="nav-btn primary large"
                >
                  Take Quiz Again
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <style>{`
        .time-complexity-container {
          background: #f8fafc;
          min-height: 100vh;
          color: #1e293b;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .time-complexity-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
          padding: 2rem 0;
        }

        .hero-content {
          background: white;
          border-radius: 12px;
          padding: 2.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .hero-badge {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .hero-section h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .hero-section p {
          font-size: 1.125rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .content-section {
          margin-bottom: 4rem;
        }

        .content-section h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 2rem;
          text-align: center;
        }

        .content-grid {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .content-text p {
          font-size: 1.125rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .info-card {
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .info-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .info-card p {
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .chart-controls {
          margin-bottom: 1.5rem;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .range-input {
          width: 100%;
          height: 0.5rem;
          background: #e5e7eb;
          border-radius: 0.5rem;
          appearance: none;
          cursor: pointer;
        }

        .range-input::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
        }

        .range-input::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }

        .chart-container {
          height: 400px;
          width: 100%;
        }

        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          background: #e5e7eb;
        }

        .filter-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .complexity-cards {
          display: grid;
          gap: 2rem;
        }

        .complexity-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .complexity-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .complexity-color {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }

        .complexity-notation {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
        }

        .complexity-name {
          font-size: 1.125rem;
          color: #64748b;
        }

        .complexity-description {
          color: #64748b;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .complexity-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .complexity-examples h4,
        .code-section h4 {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .example-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .example-list li {
          padding: 0.25rem 0;
          color: #64748b;
          font-size: 0.875rem;
          position: relative;
          padding-left: 1rem;
        }

        .example-list li::before {
          content: '•';
          color: #9ca3af;
          position: absolute;
          left: 0;
        }

        .code-block {
          background: #1e293b;
          border-radius: 8px;
          overflow: hidden;
        }

        .code-header {
          background: #334155;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #475569;
        }

        .code-title {
          color: #cbd5e1;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
        }

        .code-block pre {
          background: transparent;
          color: #e2e8f0;
          padding: 1rem;
          margin: 0;
          overflow-x: auto;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .code-block code {
          font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
        }

        .quiz-container {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .quiz-progress {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .progress-bar {
          width: 100%;
          background-color: #e5e7eb;
          border-radius: 4px;
          height: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .progress-fill {
          background-color: #3b82f6;
          height: 0.5rem;
          border-radius: 4px;
          transition: width 0.3s;
        }

        .question-container {
          margin-bottom: 1.5rem;
        }

        .question-text {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }

        .options-grid {
          display: grid;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .option-button {
          text-align: left;
          padding: 1rem;
          border-radius: 8px;
          border: 2px solid #e2e8f0;
          background-color: white;
          cursor: pointer;
          transition: all 0.2s;
          color: #374151;
        }

        .option-button:hover {
          border-color: #d1d5db;
          background-color: #f9fafb;
        }

        .option-button.selected {
          border-color: #3b82f6;
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .quiz-navigation {
          display: flex;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .nav-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .nav-btn.primary {
          background: #3b82f6;
          color: white;
        }

        .nav-btn.primary:hover {
          background: #2563eb;
        }

        .nav-btn.secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .nav-btn.secondary:hover {
          background: #e5e7eb;
        }

        .nav-btn.secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nav-btn.success {
          background: #10b981;
          color: white;
        }

        .nav-btn.success:hover {
          background: #059669;
        }

        .nav-btn.large {
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        .results-container {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .results-header {
          text-align: center;
          background: #f8fafc;
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .results-header h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .results-score {
          font-size: 2.5rem;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 0.5rem;
        }

        .results-percentage {
          color: #64748b;
          font-size: 1.125rem;
        }

        .results-list {
          margin-bottom: 2rem;
        }

        .question-review {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .question-review-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .result-icon {
          flex-shrink: 0;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .result-icon.correct {
          background-color: #10b981;
        }

        .result-icon.incorrect {
          background-color: #ef4444;
        }

        .question-review-content {
          flex: 1;
        }

        .question-review-text {
          font-weight: 500;
          color: #1e293b;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .answer-text {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .explanation-text {
          font-size: 0.875rem;
          color: #9ca3af;
          font-style: italic;
        }

        .retry-container {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .time-complexity-page {
            padding: 1rem;
          }
          
          .hero-section h1 {
            font-size: 2rem;
          }
          
          .hero-content {
            padding: 1.5rem;
          }
          
          .info-cards {
            grid-template-columns: 1fr;
          }
          
          .complexity-content {
            grid-template-columns: 1fr;
          }
          
          .filter-buttons {
            justify-content: center;
          }
          
          .quiz-navigation {
            flex-direction: column;
            gap: 1rem;
          }
          
          .nav-btn {
            width: 100%;
            text-align: center;
          }
          
          .question-review-header {
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .result-icon {
            align-self: flex-start;
          }
        }
      `}
      </style>
    </div>
  );
};
export default TimeComplexityPage;