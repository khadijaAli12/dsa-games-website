// ArraySearchLogic.js - Contains search algorithm implementations

export const arraySearchLogic = {
    linear: (array, target) => {
      const steps = [];
      
      for (let i = 0; i < array.length; i++) {
        // Checking current element
        steps.push({
          checked: [i],
          found: null,
          range: [],
          explanation: `Checking position ${i}: ${array[i]} ${array[i] === target ? '=' : '≠'} ${target}`
        });
  
        if (array[i] === target) {
          // Found the target
          steps.push({
            checked: [i],
            found: i,
            range: [],
            explanation: `🎉 Found target ${target} at position ${i}!`
          });
          return steps;
        }
      }
  
      // Target not found
      steps.push({
        checked: Array.from({length: array.length}, (_, i) => i),
        found: null,
        range: [],
        explanation: `❌ Target ${target} not found in the array after checking all elements`
      });
  
      return steps;
    },
  
    binary: (array, target) => {
      const steps = [];
      let left = 0;
      let right = array.length - 1;
      
      // Initial setup
      steps.push({
        checked: [],
        found: null,
        range: Array.from({length: array.length}, (_, i) => i),
        explanation: `Starting binary search. Search range: [${left}, ${right}]`
      });
  
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // Show current middle element
        steps.push({
          checked: [mid],
          found: null,
          range: Array.from({length: right - left + 1}, (_, i) => left + i),
          explanation: `Checking middle element at position ${mid}: ${array[mid]}`
        });
  
        if (array[mid] === target) {
          // Found target
          steps.push({
            checked: [mid],
            found: mid,
            range: [mid],
            explanation: `🎉 Found target ${target} at position ${mid}!`
          });
          return steps;
        } else if (array[mid] < target) {
          // Target is in right half
          left = mid + 1;
          steps.push({
            checked: [mid],
            found: null,
            range: left <= right ? Array.from({length: right - left + 1}, (_, i) => left + i) : [],
            explanation: `${array[mid]} < ${target}, searching right half: [${left}, ${right}]`
          });
        } else {
          // Target is in left half
          right = mid - 1;
          steps.push({
            checked: [mid],
            found: null,
            range: left <= right ? Array.from({length: right - left + 1}, (_, i) => left + i) : [],
            explanation: `${array[mid]} > ${target}, searching left half: [${left}, ${right}]`
          });
        }
      }
  
      // Target not found
      steps.push({
        checked: [],
        found: null,
        range: [],
        explanation: `❌ Target ${target} not found. Search space exhausted.`
      });
  
      return steps;
    },
  
    twoPointer: (array, target) => {
      const steps = [];
      let left = 0;
      let right = array.length - 1;
      
      // Initial setup
      steps.push({
        checked: [],
        found: null,
        range: Array.from({length: array.length}, (_, i) => i),
        pointers: { left, right },
        explanation: `Looking for two numbers that sum to ${target}. Left pointer at ${left}, right pointer at ${right}`
      });
  
      while (left < right) {
        const sum = array[left] + array[right];
        
        // Show current sum calculation
        steps.push({
          checked: [left, right],
          found: null,
          range: Array.from({length: array.length}, (_, i) => i),
          pointers: { left, right },
          explanation: `${array[left]} + ${array[right]} = ${sum}. Target: ${target}`
        });
  
        if (sum === target) {
          // Found the pair
          steps.push({
            checked: [left, right],
            found: [left, right],
            range: [],
            pointers: { left, right },
            explanation: `🎉 Found pair! ${array[left]} + ${array[right]} = ${target} at positions [${left}, ${right}]`
          });
          return steps;
        } else if (sum < target) {
          // Sum too small, move left pointer right
          left++;
          steps.push({
            checked: [],
            found: null,
            range: left < right ? Array.from({length: right - left + 1}, (_, i) => left + i) : [],
            pointers: { left, right },
            explanation: `${sum} < ${target}, need larger sum. Moving left pointer to position ${left}`
          });
        } else {
          // Sum too large, move right pointer left  
          right--;
          steps.push({
            checked: [],
            found: null,
            range: left < right ? Array.from({length: right - left + 1}, (_, i) => left + i) : [],
            pointers: { left, right },
            explanation: `${sum} > ${target}, need smaller sum. Moving right pointer to position ${right}`
          });
        }
      }
  
      // No pair found
      steps.push({
        checked: [],
        found: null,
        range: [],
        pointers: { left, right },
        explanation: `❌ No pair found that sums to ${target}`
      });
  
      return steps;
    }
  };