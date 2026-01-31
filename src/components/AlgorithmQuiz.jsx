import React, { useState } from 'react';

const AlgorithmQuiz = ({ algorithm, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const quizzes = {
    bubble: {
      title: "Bubble Sort Quiz",
      questions: [
        {
          id: 1,
          question: "What is the time complexity of Bubble Sort in the worst case?",
          options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
          correct: "O(n²)",
          explanation: "Bubble Sort compares adjacent elements and makes multiple passes through the array, resulting in O(n²) time complexity in worst case."
        },
        {
          id: 2,
          question: "When is Bubble Sort most efficient?",
          options: ["Large datasets", "Nearly sorted data", "Random data", "Reverse sorted data"],
          correct: "Nearly sorted data",
          explanation: "Bubble Sort performs best on nearly sorted data where it can terminate early when no swaps are needed."
        },
        {
          id: 3,
          question: "What is the space complexity of Bubble Sort?",
          options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
          correct: "O(1)",
          explanation: "Bubble Sort is an in-place sorting algorithm that only requires a constant amount of extra space."
        }
      ]
    },
    selection: {
      title: "Selection Sort Quiz",
      questions: [
        {
          id: 1,
          question: "How many swaps does Selection Sort make in the worst case?",
          options: ["n", "n²", "n-1", "log n"],
          correct: "n-1",
          explanation: "Selection Sort makes exactly n-1 swaps in the worst case, finding the minimum element each time."
        },
        {
          id: 2,
          question: "Which scenario is Selection Sort most suitable for?",
          options: ["Large datasets", "Memory write operations are expensive", "Fast sorting needed", "Stable sorting required"],
          correct: "Memory write operations are expensive",
          explanation: "Selection Sort minimizes the number of swaps, making it ideal when memory writes are expensive."
        },
        {
          id: 3,
          question: "Is Selection Sort stable?",
          options: ["Yes", "No", "Sometimes", "Depends on implementation"],
          correct: "No",
          explanation: "Selection Sort is not stable because it may change the relative order of equal elements during swapping."
        }
      ]
    },
    insertion: {
      title: "Insertion Sort Quiz",
      questions: [
        {
          id: 1,
          question: "What is the best-case time complexity of Insertion Sort?",
          options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
          correct: "O(n)",
          explanation: "Insertion Sort has O(n) best-case complexity when the array is already sorted."
        },
        {
          id: 2,
          question: "Which type of data does Insertion Sort work best with?",
          options: ["Random data", "Nearly sorted data", "Reverse sorted data", "Large datasets"],
          correct: "Nearly sorted data",
          explanation: "Insertion Sort is very efficient for nearly sorted data, often performing better than more complex algorithms."
        },
        {
          id: 3,
          question: "Is Insertion Sort stable?",
          options: ["Yes", "No", "Sometimes", "Depends on implementation"],
          correct: "Yes",
          explanation: "Insertion Sort is stable as it maintains the relative order of equal elements during insertion."
        }
      ]
    },
    merge: {
      title: "Merge Sort Quiz",
      questions: [
        {
          id: 1,
          question: "What is the time complexity of Merge Sort?",
          options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
          correct: "O(n log n)",
          explanation: "Merge Sort consistently has O(n log n) time complexity in all cases due to its divide-and-conquer approach."
        },
        {
          id: 2,
          question: "Is Merge Sort in-place?",
          options: ["Yes", "No", "Sometimes", "Depends on implementation"],
          correct: "No",
          explanation: "Merge Sort requires O(n) additional space for the merging process, making it not in-place."
        },
        {
          id: 3,
          question: "What is the main advantage of Merge Sort?",
          options: ["Fastest sorting algorithm", "In-place sorting", "Stable sorting", "Simple implementation"],
          correct: "Stable sorting",
          explanation: "Merge Sort's main advantage is that it's stable, preserving the relative order of equal elements."
        }
      ]
    }
  };

  const quiz = quizzes[algorithm] || quizzes.bubble;
  const questions = quiz.questions;

  const handleAnswer = (questionId, selectedOption) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const calculateScore = () => {
    const correctCount = questions.filter(q => 
      selectedAnswers[q.id] === q.correct
    ).length;
    return Math.round((correctCount / questions.length) * 100);
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    
    if (onComplete) {
      onComplete(finalScore);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showResults) {
    return (
      <div className="quiz-results">
        <h3>Quiz Results: {quiz.title}</h3>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-value">{score}%</span>
          </div>
          <p>
            {score >= 80 ? "🎉 Excellent! You have a strong understanding of this algorithm." : 
             score >= 60 ? "👍 Good job! You understand the basics. Keep learning!" : 
             "📚 Review the algorithm concepts and try again."}
          </p>
        </div>
        
        <div className="detailed-results">
          {questions.map((q, index) => (
            <div key={q.id} className="result-item">
              <div className={`result-status ${selectedAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                Q{index + 1}: {selectedAnswers[q.id] === q.correct ? '✓' : '✗'}
              </div>
              <div className="result-content">
                <p><strong>{q.question}</strong></p>
                <p className="user-answer">
                  Your answer: <span className={selectedAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}>
                    {selectedAnswers[q.id] || 'Not answered'}
                  </span>
                </p>
                <p className="correct-answer">Correct answer: {q.correct}</p>
                <p className="explanation">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="quiz-actions">
          <button onClick={handleReset} className="btn btn-secondary">Retake Quiz</button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="algorithm-quiz">
      <div className="quiz-header">
        <h3>{quiz.title}</h3>
        <div className="progress-indicator">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-container">
          <h4>{currentQ.question}</h4>
          
          <div className="options-container">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswers[currentQ.id] === option ? 'selected' : ''
                }`}
                onClick={() => handleAnswer(currentQ.id, option)}
                disabled={selectedAnswers[currentQ.id] !== undefined}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-navigation">
          <button 
            onClick={handlePrevious} 
            className="btn btn-secondary"
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {currentQuestion === questions.length - 1 ? (
            <button 
              onClick={handleSubmit} 
              className="btn btn-primary"
              disabled={!selectedAnswers[currentQ.id]}
            >
              Submit Quiz
            </button>
          ) : (
            <button 
              onClick={handleNext} 
              className="btn btn-primary"
              disabled={!selectedAnswers[currentQ.id]}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmQuiz;