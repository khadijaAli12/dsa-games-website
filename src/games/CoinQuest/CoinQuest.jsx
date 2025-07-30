import React, { useState, useEffect } from 'react';
import './CoinQuestStyles.scss';

const CoinQuest = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [target, setTarget] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numCoins = Math.min(8, 4 + Math.floor(level / 2));
    const coinValues = [1, 2, 5, 10, 20, 50, 100, 200];
    const availableCoins = coinValues.slice(0, numCoins);
    
    const newCoins = availableCoins.map(value => ({
      value,
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    const newTarget = Math.floor(Math.random() * 100) + 10;
    
    setCoins(newCoins);
    setTarget(newTarget);
    setSelectedCoins([]);
    setIsAnimating(false);
  };

  const selectCoin = (coin) => {
    if (isAnimating) return;
    
    const isSelected = selectedCoins.find(c => c.id === coin.id);
    if (isSelected) {
      setSelectedCoins(prev => prev.filter(c => c.id !== coin.id));
    } else {
      setSelectedCoins(prev => [...prev, coin]);
    }
  };

  const checkSolution = () => {
    const total = selectedCoins.reduce((sum, coin) => sum + coin.value, 0);
    
    if (total === target) {
      setScore(prev => prev + level * 10);
      setLevel(prev => prev + 1);
    }
  };

  const showGreedySolution = () => {
    setIsAnimating(true);
    const sortedCoins = [...coins].sort((a, b) => b.value - a.value);
    const greedySelection = [];
    let remainingTarget = target;
    
    for (const coin of sortedCoins) {
      if (coin.value <= remainingTarget) {
        greedySelection.push(coin);
        remainingTarget -= coin.value;
      }
    }
    
    animateGreedySolution(greedySelection);
  };

  const animateGreedySolution = (greedyCoins) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < greedyCoins.length) {
        setSelectedCoins(greedyCoins.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnimating(false);
          const total = greedyCoins.reduce((sum, coin) => sum + coin.value, 0);
          if (total === target) {
            setScore(prev => prev + level * 5);
            setLevel(prev => prev + 1);
          }
        }, 1000);
      }
    }, 500);
  };

  const getTotalSelected = () => {
    return selectedCoins.reduce((sum, coin) => sum + coin.value, 0);
  };

  return (
    <div className="coin-quest">
      <h2>🪙 Coin Quest</h2>
      
      <div className="game-info">
        <div className="stats">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
        </div>
        
        <div className="target-display">
          <h3>Target: {target}</h3>
        </div>
      </div>

      <div className="coins-container">
        <h3>Available Coins (Click to select):</h3>
        <div className="coins-grid">
          {coins.map((coin) => {
            const isSelected = selectedCoins.find(c => c.id === coin.id);
            
            return (
              <div
                key={coin.id}
                className={`coin ${isSelected ? 'selected' : ''}`}
                onClick={() => selectCoin(coin)}
              >
                <div className="coin-value">{coin.value}</div>
                <div className="coin-icon">🪙</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="selection-info">
        <h3>Selected Coins: {selectedCoins.length}</h3>
        <div className="selected-coins">
          {selectedCoins.map((coin, index) => (
            <span key={coin.id} className="selected-coin">
              {coin.value}{index < selectedCoins.length - 1 ? ' + ' : ''}
            </span>
          ))}
        </div>
        <div className="total">
          Total: {getTotalSelected()}
        </div>
        <div className={`result ${getTotalSelected() === target ? 'correct' : 'incorrect'}`}>
          {getTotalSelected() === target ? '✅ Perfect!' : 
           getTotalSelected() > target ? '❌ Too Much' : '❌ Too Little'}
        </div>
      </div>

      <div className="controls">
        <button onClick={checkSolution} disabled={isAnimating}>
          Check Solution
        </button>
        <button onClick={showGreedySolution} disabled={isAnimating}>
          Show Greedy Solution
        </button>
        <button onClick={generateLevel} disabled={isAnimating}>
          New Level
        </button>
      </div>

      <div className="explanation">
        <h3>Greedy Algorithm Strategy:</h3>
        <p>
          The greedy approach always selects the largest coin that doesn't exceed the remaining target.
          While this works for some coin systems, it may not always give the optimal solution.
          Try to find the minimum number of coins needed!
        </p>
      </div>
    </div>
  );
};

export default CoinQuest; 