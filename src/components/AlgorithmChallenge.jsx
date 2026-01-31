import React, { useState, useEffect } from 'react';

const AlgorithmChallenge = ({ algorithm, array, onComplete }) => {
  const [challengeType, setChallengeType] = useState('predict'); // 'predict', 'optimize', 'race'
  const [userPrediction, setUserPrediction] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [timeTaken, setTimeTaken] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const challenges = {
    bubble: {
      predict: {
        question: "How many comparisons will Bubble Sort make to sort this array?",
        hint: "Count the number of adjacent comparisons needed",
        validate: (prediction, arr) => {
          // For bubble sort: n(n-1)/2 comparisons in worst case
          const n = arr.length;
          const maxComparisons = (n * (n - 1)) / 2;
          const predicted = parseInt(prediction);
          return Math.abs(predicted - maxComparisons) <= 2; // Allow some error margin
        },
        explanation: "Bubble Sort makes approximately n(n-1)/2 comparisons in the worst case, where n is the array length."
      },
      optimize: {
        question: "What's the minimum number of swaps needed to sort this array?",
        hint: "Count the number of elements out of place",
        validate: (prediction, arr) => {
          // Calculate minimum swaps needed (inversion count)
          let inversions = 0;
          for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
              if (arr[i] > arr[j]) inversions++;
            }
          }
          return Math.abs(parseInt(prediction) - inversions) <= 1;
        },
        explanation: "The minimum number of swaps equals the number of inversions in the array."
      }
    },
    selection: {
      predict: {
        question: "How many passes will Selection Sort make to sort this array?",
        hint: "Selection Sort makes n-1 passes for n elements",
        validate: (prediction, arr) => parseInt(prediction) === arr.length - 1,
        explanation: "Selection Sort always makes exactly n-1 passes regardless of the initial array state."
      },
      optimize: {
        question: "What's the maximum number of swaps Selection Sort will make?",
        hint: "Selection Sort makes at most n-1 swaps",
        validate: (prediction, arr) => parseInt(prediction) <= arr.length - 1,
        explanation: "Selection Sort makes at most n-1 swaps, one for each pass except the last."
      }
    },
    insertion: {
      predict: {
        question: "How many shifts will Insertion Sort make to sort this array?",
        hint: "Count how many elements need to be moved for each insertion",
        validate: (prediction, arr) => {
          // Rough estimation based on array characteristics
          const sortedPortion = 1; // First element is already sorted
          const avgShifts = Math.floor(arr.length / 2);
          return Math.abs(parseInt(prediction) - (sortedPortion * avgShifts)) <= 3;
        },
        explanation: "The number of shifts depends on how much each element needs to be moved to its correct position."
      },
      optimize: {
        question: "What's the best-case scenario for Insertion Sort on this array?",
        hint: "Consider if the array is already sorted or nearly sorted",
        validate: (prediction, arr) => {
          // Check if array is sorted
          const isSorted = arr.every((val, i) => i === 0 || val >= arr[i-1]);
          return prediction.toLowerCase().includes('best') && isSorted;
        },
        explanation: "Insertion Sort performs best (O(n)) when the array is already sorted or nearly sorted."
      }
    }
  };

  const currentChallenge = challenges[algorithm]?.[challengeType] || challenges.bubble.predict;

  useEffect(() => {
    if (challengeType && !showResult) {
      setStartTime(Date.now());
    }
  }, [challengeType, showResult]);

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeElapsed = Math.floor((endTime - startTime) / 1000);
    setTimeTaken(timeElapsed);

    const correct = currentChallenge.validate(userPrediction, array);
    setIsCorrect(correct);
    setExplanation(currentChallenge.explanation);
    setShowResult(true);

    if (onComplete) {
      onComplete({
        challengeType,
        prediction: userPrediction,
        correct,
        timeTaken: timeElapsed
      });
    }
  };

  const handleReset = () => {
    setUserPrediction('');
    setShowResult(false);
    setIsCorrect(false);
    setExplanation('');
    setTimeTaken(0);
    setStartTime(null);
  };

  if (showResult) {
    return (
      <div className="challenge-result">
        <div className={`result-header ${isCorrect ? 'correct' : 'incorrect'}`}>
          <h3>{isCorrect ? '🎉 Correct!' : '❌ Try Again'}</h3>
          <div className="time-taken">Time: {timeTaken} seconds</div>
        </div>
        
        <div className="result-details">
          <div className="prediction-review">
            <p><strong>Your prediction:</strong> {userPrediction}</p>
            <p><strong>Actual answer:</strong> {isCorrect ? 'Your prediction was accurate!' : 'Let\'s review the concept.'}</p>
          </div>
          
          <div className="explanation-box">
            <h4>Explanation:</h4>
            <p>{explanation}</p>
          </div>
          
          <div className="challenge-actions">
            <button onClick={handleReset} className="btn btn-secondary">
              Try Different Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="algorithm-challenge">
      <div className="challenge-header">
        <h3>Algorithm Challenge</h3>
        <div className="challenge-type-selector">
          <button 
            className={`type-btn ${challengeType === 'predict' ? 'active' : ''}`}
            onClick={() => setChallengeType('predict')}
          >
            Prediction
          </button>
          <button 
            className={`type-btn ${challengeType === 'optimize' ? 'active' : ''}`}
            onClick={() => setChallengeType('optimize')}
          >
            Optimization
          </button>
        </div>
      </div>

      <div className="challenge-content">
        <div className="challenge-question">
          <h4>{currentChallenge.question}</h4>
          <p className="hint">💡 {currentChallenge.hint}</p>
        </div>

        <div className="array-display">
          <p><strong>Current Array:</strong></p>
          <div className="array-visual">
            {array.map((num, index) => (
              <div key={index} className="array-element">
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="prediction-input">
          <label htmlFor="prediction">Your Prediction:</label>
          <input
            id="prediction"
            type="text"
            value={userPrediction}
            onChange={(e) => setUserPrediction(e.target.value)}
            placeholder="Enter your answer..."
            className="prediction-field"
          />
        </div>

        <div className="challenge-actions">
          <button 
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={!userPrediction.trim()}
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmChallenge;