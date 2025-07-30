import React, { useState, useEffect } from 'react';
import './StackSurvivorStyles.scss';

const StackSurvivor = () => {
  const [stack, setStack] = useState([]);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    generateExpression();
  }, [level]);

  const generateExpression = () => {
    const operators = ['+', '-', '*', '/'];
    const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1);
    
    // Generate postfix expression
    let postfix = '';
    for (let i = 0; i < numbers.length; i++) {
      postfix += numbers[i] + ' ';
      if (i < numbers.length - 1) {
        postfix += operators[Math.floor(Math.random() * operators.length)] + ' ';
      }
    }
    
    setExpression(postfix.trim());
    setStack([]);
    setResult(null);
    setIsAnimating(false);
  };

  const pushToStack = (value) => {
    if (isAnimating) return;
    setStack(prev => [...prev, value]);
  };

  const popFromStack = () => {
    if (isAnimating || stack.length === 0) return;
    setStack(prev => prev.slice(0, -1));
  };

  const evaluatePostfix = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const tokens = expression.split(' ');
    const evalStack = [];
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < tokens.length) {
        const token = tokens[step];
        
        if (!isNaN(token)) {
          // Number
          evalStack.push(parseInt(token));
          setStack([...evalStack]);
        } else {
          // Operator
          const b = evalStack.pop();
          const a = evalStack.pop();
          let result;
          
          switch (token) {
            case '+':
              result = a + b;
              break;
            case '-':
              result = a - b;
              break;
            case '*':
              result = a * b;
              break;
            case '/':
              result = Math.floor(a / b);
              break;
            default:
              result = 0;
          }
          
          evalStack.push(result);
          setStack([...evalStack]);
        }
        
        step++;
      } else {
        clearInterval(interval);
        const finalResult = evalStack[0];
        setResult(finalResult);
        setScore(prev => prev + level * 10);
        setTimeout(() => {
          setIsAnimating(false);
          setLevel(prev => prev + 1);
        }, 1000);
      }
    }, 800);
  };

  const convertToInfix = () => {
    const tokens = expression.split(' ');
    const stack = [];
    
    for (const token of tokens) {
      if (!isNaN(token)) {
        stack.push(token);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(`(${a} ${token} ${b})`);
      }
    }
    
    return stack[0];
  };

  return (
    <div className="stack-survivor">
      <h2>🧮 Stack Survivor</h2>
      
      <div className="game-info">
        <div className="stats">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="expression-section">
        <h3>Postfix Expression:</h3>
        <div className="expression-display">
          {expression.split(' ').map((token, index) => (
            <span key={index} className="token">
              {token}
            </span>
          ))}
        </div>
        
        <div className="infix-conversion">
          <h4>Infix Form:</h4>
          <div className="infix-display">
            {convertToInfix()}
          </div>
        </div>
      </div>

      <div className="stack-section">
        <h3>Stack:</h3>
        <div className="stack-container">
          <div className="stack">
            {stack.map((item, index) => (
              <div
                key={index}
                className="stack-item"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={evaluatePostfix} disabled={isAnimating}>
          Evaluate Expression
        </button>
        <button onClick={generateExpression} disabled={isAnimating}>
          New Expression
        </button>
      </div>

      <div className="result-section">
        {result !== null && (
          <div className="result-display">
            <h3>Result: {result}</h3>
          </div>
        )}
      </div>

      <div className="manual-stack">
        <h3>Manual Stack Operations:</h3>
        <div className="stack-controls">
          <input
            type="number"
            placeholder="Enter number"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  pushToStack(value);
                  e.target.value = '';
                }
              }
            }}
          />
          <button onClick={() => {
            const input = document.querySelector('input[type="number"]');
            const value = parseInt(input.value);
            if (!isNaN(value)) {
              pushToStack(value);
              input.value = '';
            }
          }}>
            Push
          </button>
          <button onClick={popFromStack}>
            Pop
          </button>
        </div>
      </div>

      <div className="explanation">
        <h3>Postfix Expression Evaluation:</h3>
        <ul>
          <li><strong>Numbers:</strong> Push directly onto stack</li>
          <li><strong>Operators:</strong> Pop two values, apply operation, push result</li>
          <li><strong>Final Result:</strong> The only value left on stack</li>
          <li><strong>Advantage:</strong> No need for parentheses or operator precedence</li>
        </ul>
      </div>
    </div>
  );
};

export default StackSurvivor; 