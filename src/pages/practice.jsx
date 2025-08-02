import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
const DSAPractice = () => {
  const [selectedTopic, setSelectedTopic] = useState('arrays');
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('// Write your C++ solution here\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const codeEditorRef = useRef(null);

  const topics = [
    { id: 'arrays', name: 'Arrays', icon: '📊' },
    { id: 'strings', name: 'Strings', icon: '📝' },
    { id: 'linkedlist', name: 'Linked Lists', icon: '🔗' },
    { id: 'stacks', name: 'Stacks & Queues', icon: '📚' },
    { id: 'trees', name: 'Trees', icon: '🌳' },
    { id: 'graphs', name: 'Graphs', icon: '🕸️' },
    { id: 'sorting', name: 'Sorting', icon: '↕️' },
    { id: 'searching', name: 'Searching', icon: '🔍' },
    { id: 'dp', name: 'Dynamic Programming', icon: '🧩' },
    { id: 'greedy', name: 'Greedy', icon: '💰' },
    { id: 'backtracking', name: 'Backtracking', icon: '🔄' },
    { id: 'general', name: 'General DSA', icon: '🎯' }
  ];

  const difficulties = [
    { id: 'beginner', name: 'Beginner', color: 'success' },
    { id: 'intermediate', name: 'Intermediate', color: 'warning' },
    { id: 'advanced', name: 'Advanced', color: 'danger' },
    { id: 'leetcode', name: 'LeetCode Style', color: 'primary' }
  ];

  // Comprehensive DSA Knowledge Base
  const dsaKnowledge = {
    arrays: {
      concepts: {
        beginner: ["Array basics", "Indexing", "Traversal", "Linear search"],
        intermediate: ["Two pointers", "Sliding window", "Binary search", "Sorting"],
        advanced: ["Kadane's algorithm", "Dutch flag problem", "3-way partitioning"],
        leetcode: ["Two sum variations", "Subarray problems", "Matrix problems"]
      },
      problems: {
        beginner: [
          {
            title: "Find Maximum Element",
            description: "Find the largest element in an array of integers.",
            constraints: "Array size: 1 ≤ n ≤ 1000",
            examples: "Input: [3, 7, 2, 9, 1] → Output: 9",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            approach: "Iterate through array keeping track of maximum seen so far"
          },
          {
            title: "Array Sum",
            description: "Calculate the sum of all elements in an array.",
            constraints: "Array size: 1 ≤ n ≤ 1000, Elements: -1000 ≤ arr[i] ≤ 1000",
            examples: "Input: [1, 2, 3, 4, 5] → Output: 15",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            approach: "Initialize sum to 0, iterate through array adding each element"
          }
        ],
        intermediate: [
          {
            title: "Two Sum",
            description: "Find two numbers in array that add up to target sum.",
            constraints: "Array size: 2 ≤ n ≤ 10000, Each input has exactly one solution",
            examples: "Input: nums=[2,7,11,15], target=9 → Output: [0,1]",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            approach: "Use hash map to store complements while iterating"
          },
          {
            title: "Maximum Subarray",
            description: "Find the contiguous subarray with largest sum.",
            constraints: "Array size: 1 ≤ n ≤ 100000",
            examples: "Input: [-2,1,-3,4,-1,2,1,-5,4] → Output: 6 (subarray [4,-1,2,1])",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            approach: "Kadane's algorithm - keep track of current and global maximum"
          }
        ]
      }
    },
    trees: {
      concepts: {
        beginner: ["Tree structure", "Root, nodes, leaves", "Height and depth", "Tree traversal"],
        intermediate: ["Binary trees", "BST properties", "Tree balancing", "LCA"],
        advanced: ["AVL trees", "Red-black trees", "Segment trees", "Trie"],
        leetcode: ["Path problems", "Serialization", "Construction problems"]
      },
      problems: {
        beginner: [
          {
            title: "Tree Height",
            description: "Find the height of a binary tree.",
            constraints: "Number of nodes: 0 ≤ n ≤ 10000",
            examples: "Tree with root->left->left = height 2",
            timeComplexity: "O(n)",
            spaceComplexity: "O(h) where h is height",
            approach: "Recursively find max height of left and right subtrees, add 1"
          }
        ]
      }
    }
  };

  // Advanced AI Response Generator
  const generateIntelligentResponse = (message, topic, difficulty) => {
    const lowerMessage = message.toLowerCase();
    const topicData = dsaKnowledge[topic] || dsaKnowledge.arrays;
    
    // Problem request handling
    if (lowerMessage.includes('problem') || lowerMessage.includes('question') || lowerMessage.includes('give me')) {
      const problems = topicData.problems[difficulty] || topicData.problems.beginner;
      const problem = problems[Math.floor(Math.random() * problems.length)];
      setCurrentProblem(problem);
      
      return `🎯 **${problem.title}**

**Problem Description:**
${problem.description}

**Constraints:**
${problem.constraints}

**Example:**
${problem.examples}

**Expected Complexity:**
• Time: ${problem.timeComplexity}
• Space: ${problem.spaceComplexity}

Would you like me to provide:
• Hints for approaching this problem
• Step-by-step solution approach
• Code implementation in C++
• Similar problems to practice

Type "hint", "approach", "code", or "similar" to continue!`;
    }

    // Hint handling - context-aware based on current problem
    if (lowerMessage.includes('hint')) {
      if (currentProblem) {
        const hints = generateContextualHints(currentProblem, topic, difficulty);
        return `💡 **Hints for "${currentProblem.title}":**

${hints}

Need more specific guidance? Ask about:
• "approach" - detailed solution strategy
• "code" - implementation help
• "complexity" - time/space analysis`;
      } else {
        return `💡 **General Problem-Solving Hints:**

1. **Understand the Problem:** Read carefully, identify inputs/outputs
2. **Examples:** Work through 2-3 examples manually
3. **Edge Cases:** Consider empty inputs, single elements, duplicates
4. **Brute Force First:** Start with simple solution, then optimize
5. **Pattern Recognition:** Look for common algorithmic patterns

For specific hints, first request a problem by typing "give me a problem"!`;
      }
    }

    // Approach explanation
    if (lowerMessage.includes('approach') || lowerMessage.includes('solution') || lowerMessage.includes('strategy')) {
      if (currentProblem) {
        return `📋 **Solution Approach for "${currentProblem.title}":**

**Strategy:**
${currentProblem.approach}

**Step-by-step breakdown:**
${generateStepByStepApproach(currentProblem, topic)}

**Implementation Tips:**
${generateImplementationTips(currentProblem, topic)}

Ready to code? Type "code" to see the implementation!`;
      } else {
        return generateGeneralApproach(topic, difficulty);
      }
    }

    // Code implementation
    if (lowerMessage.includes('code') || lowerMessage.includes('implement') || lowerMessage.includes('solution')) {
      if (currentProblem) {
        const codeImplementation = generateCodeSolution(currentProblem, topic);
        setCode(codeImplementation);
        setShowCodeEditor(true);
        return `💻 **C++ Implementation for "${currentProblem.title}":**

I've loaded the solution into the code editor. The code includes:
• Complete implementation with comments
• Sample test cases
• Time and space complexity analysis

**Key Points:**
• Study the algorithm step by step
• Try modifying the code to handle edge cases
• Practice implementing variations

Click the "Code Editor" tab to see the full implementation!`;
      } else {
        return `💻 **Code Implementation Help:**

To get specific code implementation:
1. First request a problem: "give me a problem"
2. Then ask for code: "show me the code"

I can help with:
• Complete C++ solutions with explanations
• Debugging your code
• Code optimization techniques
• Alternative approaches

What specific coding help do you need?`;
      }
    }

    // Complexity analysis
    if (lowerMessage.includes('complexity') || lowerMessage.includes('time') || lowerMessage.includes('space')) {
      return generateComplexityAnalysis(topic, difficulty);
    }

    // Concept explanation
    if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('how does')) {
      return generateConceptExplanation(message, topic, difficulty);
    }

    // Similar problems
    if (lowerMessage.includes('similar') || lowerMessage.includes('related') || lowerMessage.includes('more')) {
      return generateSimilarProblems(topic, difficulty);
    }

    // Default intelligent response
    return `🤖 **DSA AI Assistant Ready!**

I'm here to help you master Data Structures and Algorithms. I can:

**📚 Problem Practice:**
• "Give me a ${difficulty} ${topic} problem"
• "I need hints for this problem"
• "Show me the approach/solution"

**💻 Coding Help:**
• "Show me the C++ code"
• "Help me debug my solution"
• "Explain the complexity"

**🎯 Learning Support:**
• "Explain [concept name]"
• "What are common ${topic} patterns?"
• "Give me similar problems"

**Current Settings:** ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} level ${topics.find(t => t.id === topic)?.name}

What would you like to practice today?`;
  };

  // Helper functions for generating contextual responses
  const generateContextualHints = (problem, topic, difficulty) => {
    const hintStrategies = {
      arrays: {
        "Find Maximum Element": "1. Initialize a variable to track the maximum\n2. Compare each element with current maximum\n3. Update maximum if current element is larger",
        "Two Sum": "1. Think about what you need to find for each number\n2. Can you store information as you iterate?\n3. Hash maps can help with O(1) lookups"
      },
      trees: {
        "Tree Height": "1. Think recursively - height of tree = 1 + max(left height, right height)\n2. Base case: empty tree has height 0\n3. Use DFS traversal approach"
      }
    };

    return hintStrategies[topic]?.[problem.title] || 
           `1. Break down the problem into smaller sub-problems\n2. Identify the key data structure or algorithm needed\n3. Consider edge cases and constraints\n4. Start with a brute force approach, then optimize`;
  };

  const generateStepByStepApproach = (problem, topic) => {
    const approaches = {
      "Find Maximum Element": "1. Initialize max = first element\n2. Iterate from second element\n3. If current > max, update max\n4. Return max",
      "Two Sum": "1. Create a hash map\n2. For each number, calculate complement\n3. Check if complement exists in map\n4. If yes, return indices; if no, add current number to map",
      "Tree Height": "1. Base case: if node is null, return 0\n2. Recursively get left subtree height\n3. Recursively get right subtree height\n4. Return 1 + max(left_height, right_height)"
    };

    return approaches[problem.title] || "1. Analyze the problem requirements\n2. Choose appropriate data structure\n3. Implement core algorithm\n4. Handle edge cases\n5. Optimize if needed";
  };

  const generateImplementationTips = (problem, topic) => {
    const tips = {
      arrays: "• Use descriptive variable names\n• Handle empty array case\n• Consider integer overflow for large sums\n• Use const references for read-only parameters",
      trees: "• Check for null pointers\n• Use recursive solutions for simplicity\n• Consider iterative alternatives for large trees\n• Think about tree traversal patterns"
    };

    return tips[topic] || "• Write clean, readable code\n• Add comments for complex logic\n• Test with multiple examples\n• Consider edge cases";
  };

  const generateCodeSolution = (problem, topic) => {
    const solutions = {
      "Find Maximum Element": `// Find Maximum Element in Array
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int findMaximum(const vector<int>& arr) {
    if (arr.empty()) {
        throw invalid_argument("Array cannot be empty");
    }
    
    int maxElement = arr[0];
    
    // Iterate through array starting from second element
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > maxElement) {
            maxElement = arr[i];
        }
    }
    
    return maxElement;
}

int main() {
    // Test cases
    vector<int> test1 = {3, 7, 2, 9, 1};
    vector<int> test2 = {-5, -2, -10, -1};
    vector<int> test3 = {42};
    
    cout << "Test 1: " << findMaximum(test1) << endl; // Output: 9
    cout << "Test 2: " << findMaximum(test2) << endl; // Output: -1
    cout << "Test 3: " << findMaximum(test3) << endl; // Output: 42
    
    return 0;
}

/*
Time Complexity: O(n) - visit each element once
Space Complexity: O(1) - only use constant extra space
*/`,
      
      "Two Sum": `// Two Sum Problem
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap; // value -> index
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        // Check if complement exists in map
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        
        // Add current number to map
        numMap[nums[i]] = i;
    }
    
    return {}; // No solution found
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    vector<int> result = twoSum(nums, target);
    
    if (!result.empty()) {
        cout << "Indices: " << result[0] << ", " << result[1] << endl;
        cout << "Values: " << nums[result[0]] << " + " << nums[result[1]] << " = " << target << endl;
    } else {
        cout << "No solution found" << endl;
    }
    
    return 0;
}

/*
Time Complexity: O(n) - single pass through array
Space Complexity: O(n) - hash map can store up to n elements
*/`
    };

    return solutions[problem.title] || `// C++ Solution Template
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Implement your solution here
    cout << "Hello, DSA!" << endl;
    return 0;
}`;
  };

  const generateGeneralApproach = (topic, difficulty) => {
    const approaches = {
      arrays: `📋 **Array Problem Solving Approach:**

**Common Patterns:**
• **Two Pointers:** For sorted arrays, finding pairs
• **Sliding Window:** For subarray problems
• **Hash Map:** For frequency counting, lookups
• **Sorting:** When order doesn't matter initially

**Steps:**
1. Identify if array is sorted/unsorted
2. Look for patterns in examples
3. Consider time/space tradeoffs
4. Handle edge cases (empty, single element)`,

      trees: `📋 **Tree Problem Solving Approach:**

**Common Patterns:**
• **DFS (Recursion):** For path problems, tree properties
• **BFS (Level Order):** For level-based problems
• **Bottom-up:** For aggregating information from children
• **Top-down:** For passing information to children

**Steps:**
1. Identify base case (null node)
2. Determine traversal type needed
3. Define recursive relationship
4. Consider iterative alternatives`
    };

    return approaches[topic] || "General problem-solving approach for the selected topic.";
  };

  const generateComplexityAnalysis = (topic, difficulty) => {
    return `⚡ **Complexity Analysis for ${topics.find(t => t.id === topic)?.name}:**

**Common Time Complexities:**
• O(1) - Direct access, hash map operations
• O(log n) - Binary search, balanced tree operations
• O(n) - Linear scan, tree traversal
• O(n log n) - Efficient sorting, divide and conquer
• O(n²) - Nested loops, brute force approaches

**Space Complexity Considerations:**
• **Auxiliary Space:** Extra space used by algorithm
• **Input Space:** Space for input data (usually not counted)
• **Recursive Stack:** Function call stack depth

**Optimization Tips:**
• Use hash maps for O(1) lookups
• Consider iterative vs recursive solutions
• Look for redundant calculations
• Trade space for time when beneficial

Need analysis for a specific problem? Share the problem statement!`;
  };

  const generateConceptExplanation = (message, topic, difficulty) => {
    const concepts = {
      arrays: {
        "two pointers": "Two pointers technique uses two indices moving through array simultaneously. Useful for sorted arrays, finding pairs, or problems requiring comparison of elements at different positions.",
        "sliding window": "Sliding window maintains a subset of elements and efficiently updates as window slides. Perfect for subarray problems with contiguous elements."
      },
      trees: {
        "binary tree": "Binary tree is a hierarchical structure where each node has at most two children (left and right). Foundation for many tree-based algorithms.",
        "tree traversal": "Tree traversal visits all nodes systematically. Common types: Inorder (left-root-right), Preorder (root-left-right), Postorder (left-right-root)."
      }
    };

    // Extract concept from message
    const extractedConcepts = Object.keys(concepts[topic] || {}).filter(concept => 
      message.toLowerCase().includes(concept)
    );

    if (extractedConcepts.length > 0) {
      const concept = extractedConcepts[0];
      return `📖 **${concept.toUpperCase()} Explanation:**

${concepts[topic][concept]}

**When to use:**
${getUseCases(concept, topic)}

**Common problems:**
${getCommonProblems(concept, topic)}

Would you like to practice problems using this concept?`;
    }

    return `📖 **Concept Explanation:**

I can explain various ${topics.find(t => t.id === topic)?.name} concepts! Try asking about:

${getTopicConcepts(topic).map(concept => `• "${concept}"`).join('\n')}

What specific concept would you like me to explain?`;
  };

  const getUseCases = (concept, topic) => {
    const useCases = {
      "two pointers": "• Finding pairs in sorted array\n• Palindrome checking\n• Removing duplicates\n• Merging sorted arrays",
      "sliding window": "• Maximum/minimum subarray problems\n• Fixed-size window problems\n• Dynamic window size problems",
      "binary tree": "• Hierarchical data representation\n• Search operations\n• Expression parsing\n• File system structures"
    };
    return useCases[concept] || "Multiple algorithmic scenarios";
  };

  const getCommonProblems = (concept, topic) => {
    const problems = {
      "two pointers": "• Two Sum (sorted array)\n• Container with Most Water\n• Valid Palindrome\n• Remove Duplicates",
      "sliding window": "• Maximum Subarray\n• Longest Substring Without Repeating Characters\n• Minimum Window Substring",
      "binary tree": "• Tree Traversals\n• Maximum Depth\n• Path Sum\n• Symmetric Tree"
    };
    return problems[concept] || "Various related problems";
  };

  const getTopicConcepts = (topic) => {
    const topicConcepts = {
      arrays: ["two pointers", "sliding window", "binary search", "sorting algorithms", "hash map"],
      trees: ["binary tree", "tree traversal", "binary search tree", "balanced trees", "tree properties"],
      graphs: ["graph representation", "DFS", "BFS", "shortest path", "topological sort"],
      dp: ["memoization", "tabulation", "state transitions", "optimal substructure"]
    };
    return topicConcepts[topic] || ["basic concepts", "advanced techniques", "common patterns"];
  };

  const generateSimilarProblems = (topic, difficulty) => {
    const similarProblems = {
      arrays: {
        beginner: ["Find minimum element", "Array rotation", "Count occurrences", "Merge sorted arrays"],
        intermediate: ["Three sum", "Product of array except self", "Find duplicate number", "Spiral matrix"],
        advanced: ["Median of two sorted arrays", "Longest increasing subsequence", "Maximum rectangle in histogram"],
        leetcode: ["Best time to buy/sell stock", "Container with most water", "Trapping rain water"]
      },
      trees: {
        beginner: ["Count leaf nodes", "Tree diameter", "Level order traversal", "Mirror tree"],
        intermediate: ["Lowest common ancestor", "Path sum", "Balanced binary tree", "Serialize/deserialize"],
        advanced: ["Maximum path sum", "Binary tree to linked list", "Recover BST", "Morris traversal"]
      }
    };

    const problems = similarProblems[topic]?.[difficulty] || ["Related practice problems coming soon!"];
    
    return `🔄 **Similar ${difficulty} ${topics.find(t => t.id === topic)?.name} Problems:**

${problems.map((problem, index) => `${index + 1}. ${problem}`).join('\n')}

**Practice Strategy:**
• Start with easier variations
• Focus on understanding patterns
• Implement multiple approaches
• Analyze time/space tradeoffs

Would you like me to provide a specific problem from this list?`;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput;
    setUserInput('');
    setIsLoading(true);

    // Add user message to chat
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date().toLocaleTimeString()
    }]);

    // Generate intelligent AI response
    setTimeout(() => {
      const aiResponse = generateIntelligentResponse(userMessage, selectedTopic, selectedDifficulty);
      
      setChatHistory(prev => [...prev, {
        type: 'ai',
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      setIsLoading(false);
    }, 1500);
  };

  const clearChat = () => {
    setChatHistory([]);
    setCurrentProblem(null);
  };

  const runCode = () => {
    // Simulate code execution
    setChatHistory(prev => [...prev, {
      type: 'system',
      message: `🏃‍♂️ **Code Execution Simulation:**

Your C++ code has been analyzed:
✅ Syntax appears correct
✅ Logic flow looks good
✅ Consider adding more test cases

**Note:** This is a simulation. For actual execution, copy code to your local C++ environment.

**Suggestions:**
• Test with edge cases
• Add input validation
• Consider optimization opportunities`,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const quickQuestions = [
    "Give me a problem",
    "I need a hint",
    "Show me the approach", 
    "Explain time complexity",
    "What's the best solution?",
    "Give me similar problems"
  ];

  useEffect(() => {
    if (showCodeEditor && codeEditorRef.current) {
      codeEditorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCodeEditor]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
         <Navbar />
      <style>{`
        :root {
--primary-color:rgb(167, 167, 226);
--secondary-color: #8b0426;
--accent-color:rgb(217, 211, 233);
--success-color:rgb(49, 66, 61);
--warning-color: #f59e0b;
--error-color: #ef4444;

--background:rgb(202, 196, 224);
--surface: linear-gradient(135deg, rgb(220, 221, 228) 0%, #e3e2e4 50%, #d8d5d8 100%);
--surface-hover: #633c3c;
--surface-dark: #f8f0f0;
--border: #ece9e9;
--border-light: #ece7e7;

--text-primary: #000000;
--text-secondary: #000000;
--text-muted: #0a0a0aff;
--text-white: #070606;
--text-accent: #2123a1;

--gradient-primary: linear-gradient(140deg,rgb(202, 197, 197) 0%,rgb(138, 125, 125) 100%);
--gradient-secondary: linear-gradient(135deg, #9826a5 0%, #f5576c 100%);
--gradient-accent: linear-gradient(135deg, #1a706a 0%, #610b26 100%);
--gradient-hero: linear-gradient(135deg, #0a133b 0%, #322242 50%, #3f1444 100%);

--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-colored: 0 10px 25px -3px rgb(102 102 241 / 0.2);

--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-2xl: 1.5rem;
}

        .practice-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
          min-height: 100vh;
        }

        .practice-header {
          padding: 4rem 2rem 2rem;
          background: var(--background);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .practice-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          pointer-events: none;
        }

        .header-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .header-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          color: var(--text-white);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-lg);
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .practice-header h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--text-white);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .practice-header p {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .main-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
          position: relative;
          z-index: 1;
          margin-top: -2rem;
        }

        .controls-panel, .chat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          backdrop-filter: blur(20px);
          margin-bottom: 1.5rem;
        }

        .controls-header, .chat-header {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: var(--text-white);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .controls-header h5, .chat-header h5 {
          margin: 0;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .controls-body {
          padding: 2rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .topic-select {
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 0.75rem 1rem;
          font-size: 1rem;
          font-weight: 500;
          background: var(--surface-dark);
          color: var(--text-primary);
          transition: all 0.3s ease;
          width: 100%;
        }

        .topic-select:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          outline: none;
        }

        .difficulty-grid {
          display: grid;
          gap: 0.75rem;
        }

        .difficulty-btn {
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 0.875rem 1.25rem;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          width: 100%;
          background: white;
          color: var(--text-primary);
          cursor: pointer;
        }

        .difficulty-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .difficulty-btn:hover::before {
          left: 100%;
        }

        .difficulty-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .difficulty-btn.active-success {
          background: var(--success-color);
          border-color: var(--success-color);
          color: white;
        }

        .difficulty-btn.active-warning {
          background: var(--warning-color);
          border-color: var(--warning-color);
          color: white;
        }

        .difficulty-btn.active-danger {
          background: var(--error-color);
          border-color: var(--error-color);
          color: white;
        }

        .difficulty-btn.active-primary {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }

        .quick-actions-grid {
          display: grid;
          gap: 0.75rem;
        }

        .quick-btn {
          border: none;
          border-radius: var(--radius-lg);
          padding: 0.75rem 1rem;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          width: 100%;
          cursor: pointer;
        }

        .quick-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .quick-btn:hover::after {
          width: 300px;
          height: 300px;
        }

        .quick-btn:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }

        .quick-btn-success {
          background: var(--success-color);
          color: white;
        }

        .quick-btn-info {
          background: var(--info-color);
          color: white;
        }

        .quick-btn-warning {
          background: var(--warning-color);
          color: white;
        }

        .quick-btn-secondary {
          background: var(--secondary-color);
          color: white;
        }

        .tab-container {
          display: flex;
          margin-bottom: 0;
          border-bottom: 1px solid var(--border);
        }

        .tab-btn {
          padding: 1rem 1.5rem;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          color: var(--primary-color);
          background: var(--surface-hover);
        }

        .tab-btn.active {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
          background: var(--surface-hover);
        }

        .tab-content {
          display: none;
        }

        .tab-content.active {
          display: block;
        }

        .chat-body {
          padding: 2rem;
          background: var(--surface-dark);
          height: 60vh;
          overflow-y: auto;
        }

        .code-editor-container {
          padding: 1.5rem;
          background: var(--surface-dark);
          height: 60vh;
          display: flex;
          flex-direction: column;
        }

        .code-editor {
          flex: 1;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          line-height: 1.5;
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          background: #1e293b;
          color: #e2e8f0;
          resize: none;
          outline: none;
        }

        .code-editor:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .code-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          justify-content: flex-end;
        }

        .code-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .code-btn-run {
          background: var(--success-color);
          color: white;
        }

        .code-btn-run:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        .code-btn-clear {
          background: var(--error-color);
          color: white;
        }

        .code-btn-clear:hover {
          background: #dc2626;
          transform: translateY(-2px);
        }

        .welcome-section {
          text-align: center;
          padding: 3rem 1rem;
        }

        .welcome-section h4 {
          color: var(--text-primary);
          font-weight: 700;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .welcome-section p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .quick-questions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .quick-question-btn {
          background: var(--surface);
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-primary);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .quick-question-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          transition: left 0.3s ease;
          z-index: -1;
        }

        .quick-question-btn:hover::before {
          left: 0;
        }

        .quick-question-btn:hover {
          color: var(--text-white);
          border-color: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .message-user {
          text-align: right;
          margin-bottom: 1.5rem;
        }

        .message-ai, .message-system {
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .message-bubble {
          display: inline-block;
          max-width: 85%;
          padding: 1.25rem;
          border-radius: var(--radius-xl);
          position: relative;
          word-wrap: break-word;
          white-space: pre-line;
        }

        .message-user .message-bubble {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: var(--text-white);
        }

        .message-ai .message-bubble {
          background: var(--surface);
          border: 2px solid var(--border);
          color: var(--text-primary);
        }

        .message-system .message-bubble {
          background: linear-gradient(135deg, var(--success-color) 0%, #059669 100%);
          color: var(--text-white);
          border: 2px solid var(--success-color);
        }

        .message-header {
          font-size: 0.8rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .message-content {
          line-height: 1.6;
        }

        .loading-message {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--surface);
          border: 2px solid var(--border);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-xl);
          color: var(--text-primary);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border);
          border-top: 2px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .chat-footer {
          padding: 1.5rem;
          background: var(--surface);
          border-top: 1px solid var(--border);
        }

        .input-group {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .chat-input {
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 0.875rem 1rem;
          font-size: 1rem;
          background: var(--surface-dark);
          color: var(--text-primary);
          transition: all 0.3s ease;
          flex: 1;
        }

        .chat-input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          outline: none;
        }

        .send-btn {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          border: none;
          border-radius: var(--radius-lg);
          padding: 0.875rem 1.5rem;
          color: var(--text-white);
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .send-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .send-btn:hover::before {
          left: 100%;
        }

        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .send-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .input-hint {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }

        .difficulty-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
          align-items: start;
        }

        .mb-4 {
          margin-bottom: 1.5rem;
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .main-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .practice-header {
            padding: 3rem 1.5rem 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .practice-header h1 {
            font-size: 2.5rem;
          }
          
          .quick-questions {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          
          .message-bubble {
            max-width: 90%;
          }
          
          .tab-container {
            flex-wrap: wrap;
          }
          
          .tab-btn {
            flex: 1;
            min-width: 120px;
          }
        }

        @media (max-width: 480px) {
          .practice-header {
            padding: 2rem 1rem 1rem;
          }
          
          .controls-body,
          .chat-body,
          .chat-footer,
          .code-editor-container {
            padding: 1rem;
          }
          
          .message-bubble {
            max-width: 95%;
            padding: 1rem;
          }
          
          .code-actions {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
      
      <div className="practice-container">
        <div className="practice-header">
          <div className="header-content">
            <div className="header-badge">INTELLIGENT AI ASSISTANT</div>
            <h1>🧠 Advanced DSA AI Coach</h1>
            <p>Your Personal AI Tutor for Data Structures & Algorithms Mastery</p>
          </div>
        </div>

        <div className="main-container">
          <div className="main-layout">
            <div className="controls-panel">
              <div className="controls-header">
                <h5>🎯 Learning Configuration</h5>
              </div>
              <div className="controls-body">
                <div className="mb-4">
                  <label className="form-label">Select Topic:</label>
                  <select 
                    className="topic-select"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                  >
                    {topics.map(topic => (
                      <option key={topic.id} value={topic.id}>
                        {topic.icon} {topic.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Difficulty Level:</label>
                  <div className="difficulty-grid">
                    {difficulties.map(diff => (
                      <button
                        key={diff.id}
                        className={`difficulty-btn ${
                          selectedDifficulty === diff.id ? `active-${diff.color}` : ''
                        }`}
                        onClick={() => setSelectedDifficulty(diff.id)}
                      >
                        {diff.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Quick Actions:</label>
                  <div className="quick-actions-grid">
                    <button 
                      className="quick-btn quick-btn-success"
                      onClick={() => {
                        setUserInput("Give me a problem");
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      🎲 Get Problem
                    </button>
                    <button 
                      className="quick-btn quick-btn-info"
                      onClick={() => {
                        setUserInput("I need a hint");
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      💡 Need Hint
                    </button>
                    <button 
                      className="quick-btn quick-btn-secondary"
                      onClick={() => {
                        setUserInput("Show me the approach");
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      📋 Get Approach
                    </button>
                    <button 
                      className="quick-btn quick-btn-warning"
                      onClick={clearChat}
                    >
                      🗑️ Clear Session
                    </button>
                  </div>
                </div>

                {currentProblem && (
                  <div style={{
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                    border: '2px solid #0ea5e9',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem',
                    marginTop: '1rem'
                  }}>
                    <h6 style={{ margin: '0 0 0.5rem 0', color: '#0369a1', fontWeight: '700' }}>
                      🎯 Current Problem
                    </h6>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#0c4a6e' }}>
                      {currentProblem.title}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="chat-card">
              <div className="chat-header">
                <h5>
                  💬 AI Learning Assistant - {topics.find(t => t.id === selectedTopic)?.name}
                  <span className="difficulty-badge">
                    {difficulties.find(d => d.id === selectedDifficulty)?.name}
                  </span>
                </h5>
              </div>

              <div className="tab-container">
                <button
                  className={`tab-btn ${!showCodeEditor ? 'active' : ''}`}
                  onClick={() => setShowCodeEditor(false)}
                >
                  💬 Chat
                </button>
                <button
                  className={`tab-btn ${showCodeEditor ? 'active' : ''}`}
                  onClick={() => setShowCodeEditor(true)}
                >
                  💻 Code Editor
                </button>
              </div>

              <div className={`tab-content ${!showCodeEditor ? 'active' : ''}`}>
                <div className="chat-body">
                  {chatHistory.length === 0 && (
                    <div className="welcome-section">
                      <h4>🚀 Welcome to Advanced DSA AI Coach!</h4>
                      <p>
                        I'm your intelligent AI tutor, ready to help you master Data Structures and Algorithms. 
                        I can provide personalized problems, contextual hints, detailed explanations, and complete code solutions.
                      </p>
                      <div className="quick-questions">
                        {quickQuestions.map((question, index) => (
                          <button
                            key={index}
                            className="quick-question-btn"
                            onClick={() => {
                              setUserInput(question);
                              setTimeout(() => handleSendMessage(), 100);
                            }}
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`${chat.type === 'user' ? 'message-user' : chat.type === 'system' ? 'message-system' : 'message-ai'} fade-in`}>
                      <div className="message-bubble">
                        <div className="message-header">
                          {chat.type === 'user' ? '👤 You' : chat.type === 'system' ? '⚡ System' : '🧠 AI Coach'} - {chat.timestamp}
                        </div>
                        <div className="message-content">
                          {chat.message}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="message-ai fade-in">
                      <div className="loading-message">
                        <div className="spinner"></div>
                        <span>AI is analyzing and preparing response...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={`tab-content ${showCodeEditor ? 'active' : ''}`} ref={codeEditorRef}>
                <div className="code-editor-container">
                  <textarea
                    className="code-editor"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// Your C++ code will appear here when you request solutions..."
                    spellCheck={false}
                  />
                  <div className="code-actions">
                    <button 
                      className="code-btn code-btn-run"
                      onClick={runCode}
                    >
                      ▶️ Analyze Code
                    </button>
                    <button 
                      className="code-btn code-btn-clear"
                      onClick={() => setCode('// Write your C++ solution here\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}')}
                    >
                      🗑️ Clear Code
                    </button>
                  </div>
                </div>
              </div>

              <div className="chat-footer">
                <div className="input-group">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask me anything about DSA: problems, concepts, algorithms, complexity analysis..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <button 
                    className="send-btn" 
                    onClick={handleSendMessage}
                    disabled={isLoading || !userInput.trim()}
                  >
                    {isLoading ? (
                      <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                    ) : (
                      '🚀 Send'
                    )}
                  </button>
                </div>
                <div className="input-hint">
                  💡 Try: "Explain two pointers technique" or "Give me a {selectedDifficulty} {topics.find(t => t.id === selectedTopic)?.name.toLowerCase()} problem"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAPractice;