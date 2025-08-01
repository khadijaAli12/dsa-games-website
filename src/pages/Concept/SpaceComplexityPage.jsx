import React from 'react';

const SpaceComplexityPage = () => {
  return (
    <div className="space-complexity-container">
      <div className="space-complexity-page">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Algorithm Analysis</span>
            </div>
            <h1>Space Complexity</h1>
            <p>
              Understanding how algorithms consume memory resources as input size grows, 
              measured through Big O notation for optimal performance analysis.
            </p>
            <div className="complexity-grid">
              <div className="complexity-item o1">O(1)</div>
              <div className="complexity-item on">O(n)</div>
              <div className="complexity-item on2">O(n²)</div>
              <div className="complexity-item ologn">O(log n)</div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>Understanding Space Complexity</h2>
          <div className="content-grid">
            <div className="content-text">
              <p>
                Space complexity describes memory usage patterns using Big O notation. 
                It measures additional memory required beyond the input itself.
              </p>
            </div>
            <div className="complexity-list">
              <div className="complexity-row">
                <span className="complexity-notation o1-bg">O(1)</span>
                <span className="complexity-desc">Constant space - Fixed memory usage</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-notation ologn-bg">O(log n)</span>
                <span className="complexity-desc">Logarithmic space - Divide & conquer</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-notation on-bg">O(n)</span>
                <span className="complexity-desc">Linear space - Proportional growth</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-notation on2-bg">O(n²)</span>
                <span className="complexity-desc">Quadratic space - Matrix operations</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-notation o2n-bg">O(2ⁿ)</span>
                <span className="complexity-desc">Exponential space - Recursive exploration</span>
              </div>
            </div>
          </div>
        </section>

        <section className="examples-section">
          <h2>Practical Examples</h2>
          
          <div className="examples-grid">
            
            <div className="example-card">
              <div className="example-header">
                <span className="complexity-tag o1-bg">O(1)</span>
                <h3>Constant Space</h3>
              </div>
              <p>Fixed memory usage regardless of input size</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-title">isEven.js</span>
                </div>
                <pre><code>{`function isEven(n) {
  return n % 2 === 0;
}`}</code></pre>
              </div>
            </div>

            <div className="example-card">
              <div className="example-header">
                <span className="complexity-tag on-bg">O(n)</span>
                <h3>Linear Space</h3>
              </div>
              <p>Memory grows proportionally with input</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-title">cloneArray.js</span>
                </div>
                <pre><code>{`function cloneArray(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
  }
  return result;
}`}</code></pre>
              </div>
            </div>

            <div className="example-card">
              <div className="example-header">
                <span className="complexity-tag on2-bg">O(n²)</span>
                <h3>Quadratic Space</h3>
              </div>
              <p>2D data structures and matrices</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-title">createMatrix.js</span>
                </div>
                <pre><code>{`function createMatrix(n) {
  const matrix = new Array(n);
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n);
  }
  return matrix;
}`}</code></pre>
              </div>
            </div>

            <div className="example-card">
              <div className="example-header">
                <span className="complexity-tag on-bg">O(n)</span>
                <h3>Recursive Stack</h3>
              </div>
              <p>Call stack frames accumulate with recursion depth</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-title">factorial.js</span>
                </div>
                <pre><code>{`function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}`}</code></pre>
              </div>
            </div>

            <div className="example-card">
              <div className="example-header">
                <span className="complexity-tag on-bg">O(n)</span>
                <h3>Hash Map Storage</h3>
              </div>
              <p>Storing element frequencies in memory</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-title">countFrequencies.js</span>
                </div>
                <pre><code>{`function countFrequencies(arr) {
  const map = {};
  for (let num of arr) {
    map[num] = (map[num] || 0) + 1;
  }
  return map;
}`}</code></pre>
              </div>
            </div>

            <div className="example-card">
              <div className="example-header">
                <span className="complexity-tag o2n-bg">O(2ⁿ)</span>
                <h3>Backtracking</h3>
              </div>
              <p>Exponential space for exploring all possibilities</p>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-title">generateSubsets.js</span>
                </div>
                <pre><code>{`function generateSubsets(nums, index = 0, path = [], res = []) {
  if (index === nums.length) {
    res.push([...path]);
    return;
  }
  generateSubsets(nums, index + 1, path, res);
  path.push(nums[index]);
  generateSubsets(nums, index + 1, path, res);
  path.pop();
  return res;
}`}</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .space-complexity-container {
          background: #f8fafc;
          min-height: 100vh;
          color: #1e293b;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .space-complexity-page {
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
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .complexity-grid {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .complexity-item {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          color: white;
        }

        .content-section, .examples-section {
          margin-bottom: 4rem;
        }

        .content-section h2, .examples-section h2 {
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

        .complexity-list {
          display: grid;
          gap: 0.75rem;
        }

        .complexity-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .complexity-notation {
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
          color: white;
          min-width: 70px;
          text-align: center;
          font-size: 0.875rem;
        }

        .complexity-desc {
          color: #475569;
          font-weight: 500;
        }

        .examples-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .example-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .example-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .complexity-tag {
          padding: 0.375rem 0.75rem;
          border-radius: 16px;
          font-weight: 600;
          color: white;
          font-size: 0.75rem;
        }

        .example-header h3 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }

        .example-card p {
          color: #64748b;
          margin-bottom: 1rem;
          line-height: 1.5;
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

        /* Color schemes */
        .o1, .o1-bg { background: #10b981; }
        .on, .on-bg { background: #3b82f6; }
        .on2, .on2-bg { background: #f59e0b; }
        .ologn, .ologn-bg { background: #8b5cf6; }
        .o2n, .o2n-bg { background: #ef4444; }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .space-complexity-page {
            padding: 1rem;
          }
          
          .hero-section h1 {
            font-size: 2rem;
          }
          
          .hero-content {
            padding: 1.5rem;
          }
          
          .examples-grid {
            grid-template-columns: 1fr;
          }
          
          .complexity-grid {
            gap: 0.5rem;
          }
          
          .complexity-item {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SpaceComplexityPage;