// Educational sorting algorithms with detailed explanations for each step
export const sortLogic = {
  bubble: (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    let totalSwaps = 0;

    for (let i = 0; i < n - 1; i++) {
      let swappedInThisPass = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Show comparison
        steps.push({
          array: [...arr],
          explanation: `Comparing elements at positions ${j} and ${j + 1}: ${arr[j]} and ${arr[j + 1]}`,
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
        });

        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          totalSwaps++;
          swappedInThisPass = true;
          
          steps.push({
            array: [...arr],
            explanation: `${arr[j + 1]} > ${arr[j]}, so we swap them. Elements are now in correct relative order.`,
            comparing: [],
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
          });
        } else {
          steps.push({
            array: [...arr],
            explanation: `${arr[j]} ≤ ${arr[j + 1]}, so no swap needed. They are already in correct order.`,
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
          });
        }
      }
      
      // Mark the last element of this pass as sorted
      steps.push({
        array: [...arr],
        explanation: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} is now in its final position.`,
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k)
      });

      // Early termination if no swaps occurred
      if (!swappedInThisPass) {
        steps.push({
          array: [...arr],
          explanation: `No swaps made in this pass. Array is already sorted!`,
          comparing: [],
          swapping: [],
          sorted: Array.from({ length: n }, (_, k) => k)
        });
        break;
      }
    }

    return steps;
  },

  selection: (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      
      steps.push({
        array: [...arr],
        explanation: `Starting pass ${i + 1}. Looking for the minimum element in the unsorted portion.`,
        comparing: [i],
        swapping: [],
        sorted: Array.from({ length: i }, (_, k) => k)
      });

      // Find minimum element in remaining unsorted array
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...arr],
          explanation: `Comparing ${arr[j]} with current minimum ${arr[minIndex]}`,
          comparing: [j, minIndex],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => k)
        });

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          steps.push({
            array: [...arr],
            explanation: `Found new minimum: ${arr[minIndex]} at position ${minIndex}`,
            comparing: [minIndex],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => k)
          });
        }
      }

      // Swap the found minimum element with the first element
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push({
          array: [...arr],
          explanation: `Swapping minimum element ${arr[i]} with element at position ${i}`,
          comparing: [],
          swapping: [i, minIndex],
          sorted: Array.from({ length: i }, (_, k) => k)
        });
      }

      steps.push({
        array: [...arr],
        explanation: `Element ${arr[i]} is now in its correct position.`,
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: i + 1 }, (_, k) => k)
      });
    }

    return steps;
  },

  insertion: (array) => {
    const steps = [];
    const arr = [...array];

    steps.push({
      array: [...arr],
      explanation: `Starting with first element ${arr[0]} as sorted portion.`,
      comparing: [],
      swapping: [],
      sorted: [0]
    });

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;

      steps.push({
        array: [...arr],
        explanation: `Taking element ${key} and finding its correct position in sorted portion.`,
        comparing: [i],
        swapping: [],
        sorted: Array.from({ length: i }, (_, k) => k)
      });

      // Move elements that are greater than key one position ahead
      while (j >= 0 && arr[j] > key) {
        steps.push({
          array: [...arr],
          explanation: `${arr[j]} > ${key}, so shifting ${arr[j]} one position right.`,
          comparing: [j, j + 1],
          swapping: [],
          sorted: []
        });

        arr[j + 1] = arr[j];
        j = j - 1;

        steps.push({
          array: [...arr],
          explanation: `Shifted ${arr[j + 2]} to position ${j + 2}.`,
          comparing: [],
          swapping: [j + 1, j + 2],
          sorted: []
        });
      }

      arr[j + 1] = key;
      
      steps.push({
        array: [...arr],
        explanation: `Inserting ${key} at position ${j + 1}. Sorted portion now has ${i + 1} elements.`,
        comparing: [],
        swapping: [j + 1],
        sorted: Array.from({ length: i + 1 }, (_, k) => k)
      });
    }

    return steps;
  },

  merge: (array) => {
    const steps = [];
    const arr = [...array];
    
    const merge = (left, mid, right, depth = 0) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      
      steps.push({
        array: [...arr],
        explanation: `Merging subarrays [${leftArr.join(', ')}] and [${rightArr.join(', ')}]`,
        comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        swapping: [],
        sorted: []
      });

      let i = 0, j = 0, k = left;

      while (i < leftArr.length && j < rightArr.length) {
        steps.push({
          array: [...arr],
          explanation: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
          comparing: [left + i, mid + 1 + j],
          swapping: [],
          sorted: []
        });

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          steps.push({
            array: [...arr],
            explanation: `${leftArr[i]} ≤ ${rightArr[j]}, placing ${leftArr[i]} at position ${k}`,
            comparing: [],
            swapping: [k],
            sorted: []
          });
          i++;
        } else {
          arr[k] = rightArr[j];
          steps.push({
            array: [...arr],
            explanation: `${rightArr[j]} < ${leftArr[i]}, placing ${rightArr[j]} at position ${k}`,
            comparing: [],
            swapping: [k],
            sorted: []
          });
          j++;
        }
        k++;
      }

      // Copy remaining elements
      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        steps.push({
          array: [...arr],
          explanation: `Copying remaining element ${leftArr[i]} to position ${k}`,
          comparing: [],
          swapping: [k],
          sorted: []
        });
        i++;
        k++;
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        steps.push({
          array: [...arr],
          explanation: `Copying remaining element ${rightArr[j]} to position ${k}`,
          comparing: [],
          swapping: [k],
          sorted: []
        });
        j++;
        k++;
      }

      steps.push({
        array: [...arr],
        explanation: `Merge complete for range [${left}-${right}]. Subarray is now sorted.`,
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: right - left + 1 }, (_, i) => left + i)
      });
    };

    const mergeSort = (left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        steps.push({
          array: [...arr],
          explanation: `Dividing array at position ${mid}. Left: [${left}-${mid}], Right: [${mid + 1}-${right}]`,
          comparing: Array.from({ length: mid - left + 1 }, (_, i) => left + i),
          swapping: Array.from({ length: right - mid }, (_, i) => mid + 1 + i),
          sorted: []
        });

        mergeSort(left, mid);
        mergeSort(mid + 1, right);
        merge(left, mid, right);
      }
    };

    mergeSort(0, arr.length - 1);
    return steps;
  }
};