import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import '../../styles/global.scss';

const MathematicalAlgorithmsPage = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('gcd');

  const mathAlgorithms = [
    {
      id: 'gcd',
      name: 'GCD & LCM Algorithms',
      complexity: 'O(log(min(a,b)))',
      description: 'Euclidean algorithm for finding Greatest Common Divisor and Least Common Multiple',
      applications: ['Fraction simplification', 'Cryptography', 'Number theory problems'],
      advantages: ['Extremely efficient', 'Simple implementation', 'Fundamental mathematical tool'],
      disadvantages: ['Limited to integer arithmetic', 'Not applicable to other data types'],
      implementation: `// Euclidean Algorithm for GCD
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Recursive version
function gcdRecursive(a, b) {
  return b === 0 ? a : gcdRecursive(b, a % b);
}

// Extended Euclidean Algorithm
function extendedGCD(a, b) {
  if (a === 0) {
    return { gcd: b, x: 0, y: 1 };
  }
  
  const result = extendedGCD(b % a, a);
  const x = result.y - Math.floor(b / a) * result.x;
  const y = result.x;
  
  return { gcd: result.gcd, x: x, y: y };
}

// LCM using GCD
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

// Example usage:
// console.log(gcd(48, 18)); // 6
// console.log(lcm(12, 18)); // 36
// console.log(extendedGCD(30, 18)); // {gcd: 6, x: -1, y: 2}`
    },
    {
      id: 'prime',
      name: 'Prime Number Algorithms',
      complexity: 'O(√n) trial division, O(n log log n) sieve',
      description: 'Methods for primality testing and prime number generation',
      applications: ['Cryptography', 'Hash functions', 'Random number generation'],
      advantages: ['Sieve of Eratosthenes is very efficient', 'Multiple optimization techniques'],
      disadvantages: ['Large numbers require probabilistic methods', 'Deterministic tests can be slow'],
      implementation: `// Trial Division Method
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// Sieve of Eratosthenes
function sieveOfEratosthenes(limit) {
  const isPrime = new Array(limit + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  
  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = false;
      }
    }
  }
  
  // Collect primes
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

// Optimized prime checking for large numbers
function millerRabin(n, k = 5) {
  if (n === 2 || n === 3) return true;
  if (n < 2 || n % 2 === 0) return false;
  
  // Write n-1 as d * 2^r
  let r = 0;
  let d = n - 1;
  while (d % 2 === 0) {
    d /= 2;
    r++;
  }
  
  // Witness loop
  for (let i = 0; i < k; i++) {
    const a = 2 + Math.floor(Math.random() * (n - 4));
    let x = modularExponentiation(a, d, n);
    
    if (x === 1 || x === n - 1) continue;
    
    let composite = true;
    for (let j = 0; j < r - 1; j++) {
      x = (x * x) % n;
      if (x === n - 1) {
        composite = false;
        break;
      }
    }
    
    if (composite) return false;
  }
  
  return true;
}

// Helper function for modular exponentiation
function modularExponentiation(base, exponent, modulus) {
  if (modulus === 1) return 0;
  let result = 1;
  base = base % modulus;
  
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }
  
  return result;
}

// Example usage:
// console.log(sieveOfEratosthenes(30)); 
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`
    },
    {
      id: 'modular',
      name: 'Modular Arithmetic',
      complexity: 'O(log n) for exponentiation',
      description: 'Efficient computation with modular operations and congruences',
      applications: ['Cryptography', 'Competitive programming', 'Hash functions'],
      advantages: ['Prevents integer overflow', 'Enables working with large numbers', 'Mathematical elegance'],
      disadvantages: ['Requires understanding of modular mathematics', 'Division is complex in modular arithmetic'],
      implementation: `// Modular Addition
function modAdd(a, b, mod) {
  return ((a % mod) + (b % mod)) % mod;
}

// Modular Subtraction
function modSub(a, b, mod) {
  return ((a % mod) - (b % mod) + mod) % mod;
}

// Modular Multiplication
function modMul(a, b, mod) {
  return ((a % mod) * (b % mod)) % mod;
}

// Modular Exponentiation (Fast Power)
function modPow(base, exp, mod) {
  if (mod === 1) return 0;
  let result = 1;
  base = base % mod;
  
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  
  return result;
}

// Modular Inverse (using Extended Euclidean Algorithm)
function modInverse(a, mod) {
  const { gcd, x } = extendedGCD(a, mod);
  if (gcd !== 1) return null; // Inverse doesn't exist
  return (x % mod + mod) % mod;
}

// Chinese Remainder Theorem
function chineseRemainderTheorem(remainders, moduli) {
  const totalMod = moduli.reduce((acc, mod) => acc * mod, 1);
  let result = 0;
  
  for (let i = 0; i < remainders.length; i++) {
    const partialMod = totalMod / moduli[i];
    const inverse = modInverse(partialMod, moduli[i]);
    result = (result + remainders[i] * partialMod * inverse) % totalMod;
  }
  
  return result;
}

// Example usage:
// console.log(modPow(2, 10, 1000)); // 24
// console.log(modInverse(3, 11)); // 4 (since 3 * 4 ≡ 1 (mod 11))`
    }
  ];

  const currentAlgorithm = mathAlgorithms.find(alg => alg.id === activeAlgorithm);

  return (
    <div className="math-algorithms-container">
      <Navbar />
      <div className="math-algorithms-page">
        {/* Header */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">Mathematical Algorithms</div>
            <h1>Number Theory & Computational Mathematics</h1>
            <p>
              Explore fundamental mathematical algorithms that power cryptography, 
              competitive programming, and advanced computational problems.
            </p>
          </div>
        </section>

        {/* Algorithm Selection */}
        <section className="algorithm-selection">
          <h2>Mathematical Algorithms</h2>
          <div className="algorithm-tabs">
            {mathAlgorithms.map(algorithm => (
              <button
                key={algorithm.id}
                className={`tab-button ${activeAlgorithm === algorithm.id ? 'active' : ''}`}
                onClick={() => setActiveAlgorithm(algorithm.id)}
              >
                {algorithm.name}
              </button>
            ))}
          </div>
        </section>

        {/* Algorithm Details */}
        {currentAlgorithm && (
          <section className="algorithm-details">
            <div className="algorithm-header">
              <h2>{currentAlgorithm.name}</h2>
              <div className="complexity-badge">
                Time Complexity: {currentAlgorithm.complexity}
              </div>
            </div>

            <div className="algorithm-content">
              <div className="description-section">
                <h3>Description</h3>
                <p>{currentAlgorithm.description}</p>
              </div>

              <div className="applications">
                <h3>Applications</h3>
                <ul>
                  {currentAlgorithm.applications.map((app, index) => (
                    <li key={index}>{app}</li>
                  ))}
                </ul>
              </div>

              <div className="pros-cons">
                <div className="advantages">
                  <h4>Advantages</h4>
                  <ul>
                    {currentAlgorithm.advantages.map((adv, index) => (
                      <li key={index}>{adv}</li>
                    ))}
                  </ul>
                </div>
                <div className="disadvantages">
                  <h4>Disadvantages</h4>
                  <ul>
                    {currentAlgorithm.disadvantages.map((dis, index) => (
                      <li key={index}>{dis}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="implementation-section">
                <h3>Implementation</h3>
                <div className="code-block">
                  <pre><code>{currentAlgorithm.implementation}</code></pre>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Mathematical Concepts */}
        <section className="concepts-section">
          <h2>Fundamental Concepts</h2>
          <div className="concepts-grid">
            <div className="concept-card">
              <h3>Number Theory</h3>
              <p>Study of integers and their properties, including divisibility and prime numbers</p>
            </div>
            <div className="concept-card">
              <h3>Cryptography</h3>
              <p>Secure communication using mathematical algorithms and protocols</p>
            </div>
            <div className="concept-card">
              <h3>Modular Arithmetic</h3>
              <p>Arithmetic system for integers where numbers "wrap around" upon reaching a modulus</p>
            </div>
            <div className="concept-card">
              <h3>Randomization</h3>
              <p>Using probability and randomness in algorithm design for efficiency</p>
            </div>
          </div>
        </section>

        {/* Practice Resources */}
        <section className="resources-section">
          <h2>Learning Resources</h2>
          <div className="resources-content">
            <p>Deepen your understanding with these resources:</p>
            <div className="resource-links">
              <button className="primary-btn" onClick={() => window.location.href = '/practice'}>
                Practice Problems
              </button>
              <button className="secondary-btn" onClick={() => window.location.href = '/games'}>
                Interactive Demos
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MathematicalAlgorithmsPage;