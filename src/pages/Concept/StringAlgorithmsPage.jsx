import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import '../../styles/global.scss';

const StringAlgorithmsPage = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('kmp');

  const stringAlgorithms = [
    {
      id: 'kmp',
      name: 'KMP Algorithm',
      complexity: 'O(n + m)',
      description: 'Knuth-Morris-Pratt algorithm for efficient pattern matching',
      useCases: ['Text searching', 'DNA sequence matching', 'Plagiarism detection'],
      advantages: ['Linear time complexity', 'No backtracking in text', 'Preprocessing optimization'],
      disadvantages: ['Complex implementation', 'Requires preprocessing space'],
      implementation: `function computeLPS(pattern) {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;
  
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

function KMPSearch(text, pattern) {
  const lps = computeLPS(pattern);
  const matches = [];
  let i = 0; // text index
  let j = 0; // pattern index
  
  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }
    
    if (j === pattern.length) {
      matches.push(i - j); // Found match
      j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  
  return matches;
}

// Example usage:
// const text = "ABABDABACDABABCABAB";
// const pattern = "ABABCABAB";
// const matches = KMPSearch(text, pattern);
// console.log(matches); // [10]`
    },
    {
      id: 'rabin-karp',
      name: 'Rabin-Karp Algorithm',
      complexity: 'O(n + m) average, O(nm) worst',
      description: 'Uses rolling hash for efficient string matching',
      useCases: ['Multiple pattern search', 'Digital fingerprinting', 'File comparison'],
      advantages: ['Simple implementation', 'Good for multiple patterns', 'Hash-based efficiency'],
      disadvantages: ['Hash collisions possible', 'Worst-case performance issues'],
      implementation: `function rabinKarpSearch(text, pattern) {
  const prime = 101;
  const matches = [];
  
  const patternHash = hash(pattern, prime);
  let textHash = hash(text.substring(0, pattern.length), prime);
  
  for (let i = 0; i <= text.length - pattern.length; i++) {
    if (patternHash === textHash) {
      // Check character by character to confirm
      if (text.substring(i, i + pattern.length) === pattern) {
        matches.push(i);
      }
    }
    
    // Calculate rolling hash for next window
    if (i < text.length - pattern.length) {
      textHash = recalculateHash(
        text, 
        i, 
        i + pattern.length, 
        textHash, 
        pattern.length, 
        prime
      );
    }
  }
  
  return matches;
}

function hash(str, prime) {
  let hashValue = 0;
  for (let i = 0; i < str.length; i++) {
    hashValue = (prime * hashValue + str.charCodeAt(i)) % 1000000007;
  }
  return hashValue;
}

function recalculateHash(text, oldIndex, newIndex, oldHash, patternLength, prime) {
  const newHash = (prime * (oldHash - text.charCodeAt(oldIndex) * 
    Math.pow(prime, patternLength - 1)) + text.charCodeAt(newIndex)) % 1000000007;
  return newHash >= 0 ? newHash : newHash + 1000000007;
}

// Efficient for multiple pattern searches`
    },
    {
      id: 'palindrome',
      name: 'Palindrome Algorithms',
      complexity: 'O(n)',
      description: 'Techniques for identifying and working with palindromic strings',
      useCases: ['Longest palindromic substring', 'Palindrome validation', 'Manacher\'s algorithm'],
      advantages: ['Linear time solutions exist', 'Expanding around centers technique', 'Dynamic programming approaches'],
      disadvantages: ['Naive approaches are inefficient', 'Some algorithms are complex'],
      implementation: `// Expand around center approach for longest palindrome
function longestPalindrome(s) {
  if (s.length < 2) return s;
  
  let start = 0;
  let maxLength = 1;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        start = left;
      }
      left--;
      right++;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);     // Odd length palindromes
    expandAroundCenter(i, i + 1); // Even length palindromes
  }
  
  return s.substring(start, start + maxLength);
}

// Manacher's algorithm for linear time solution
function manachersAlgorithm(s) {
  // Transform string to handle even and odd length uniformly
  const transformed = '^#' + s.split('').join('#') + '#$';
  const P = new Array(transformed.length).fill(0);
  let center = 0, right = 0;
  
  for (let i = 1; i < transformed.length - 1; i++) {
    const mirror = 2 * center - i;
    
    if (i < right) {
      P[i] = Math.min(right - i, P[mirror]);
    }
    
    // Expand around center i
    while (transformed[i + (1 + P[i])] === transformed[i - (1 + P[i])]) {
      P[i]++;
    }
    
    // Update center and right boundary if expanded past current right
    if (i + P[i] > right) {
      center = i;
      right = i + P[i];
    }
  }
  
  // Find the longest palindrome
  let maxLen = 0;
  let centerIndex = 0;
  for (let i = 1; i < P.length - 1; i++) {
    if (P[i] > maxLen) {
      maxLen = P[i];
      centerIndex = i;
    }
  }
  
  const start = Math.floor((centerIndex - maxLen) / 2);
  return s.substring(start, start + maxLen);
}

// Example usage:
// console.log(longestPalindrome("babad")); // "bab" or "aba"
// console.log(manachersAlgorithm("babad")); // "bab" or "aba"`
    }
  ];

  const currentAlgorithm = stringAlgorithms.find(alg => alg.id === activeAlgorithm);

  return (
    <div className="string-algorithms-container">
      <Navbar />
      <div className="string-algorithms-page">
        {/* Header */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">String Algorithms</div>
            <h1>Text Processing & Pattern Matching</h1>
            <p>
              Master advanced algorithms for string manipulation, pattern matching, 
              and text processing with efficient solutions for real-world applications.
            </p>
          </div>
        </section>

        {/* Algorithm Selection */}
        <section className="algorithm-selection">
          <h2>String Algorithms</h2>
          <div className="algorithm-tabs">
            {stringAlgorithms.map(algorithm => (
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

              <div className="use-cases">
                <h3>Common Use Cases</h3>
                <ul>
                  {currentAlgorithm.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
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

        {/* Applications Section */}
        <section className="applications-section">
          <h2>Real-World Applications</h2>
          <div className="applications-grid">
            <div className="application-card">
              <h3>🔍 Text Search Engines</h3>
              <p>Efficient document searching and indexing systems</p>
            </div>
            <div className="application-card">
              <h3>🧬 Bioinformatics</h3>
              <p>DNA sequence matching and genetic analysis</p>
            </div>
            <div className="application-card">
              <h3>🛡️ Cybersecurity</h3>
              <p>Pattern detection in network traffic and malware analysis</p>
            </div>
            <div className="application-card">
              <h3>📄 Document Processing</h3>
              <p>Plagiarism detection and content analysis</p>
            </div>
          </div>
        </section>

        {/* Practice Section */}
        <section className="practice-section">
          <h2>Practice These Algorithms</h2>
          <div className="practice-content">
            <p>Apply your knowledge with interactive exercises:</p>
            <div className="practice-actions">
              <button className="primary-btn" onClick={() => window.location.href = '/practice'}>
                Coding Challenges
              </button>
              <button className="secondary-btn" onClick={() => window.location.href = '/games'}>
                Interactive Games
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StringAlgorithmsPage;