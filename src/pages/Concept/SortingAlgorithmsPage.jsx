import React, { useState } from 'react';

const SortingAlgorithmsPage = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('bubble-sort');

  const sortingCategories = [
    {
      id: 'simple',
      name: 'Simple Sorting',
      algorithms: [
        { name: 'Bubble Sort', complexity: 'O(n²)', icon: '🫧', stable: true, inPlace: true },
        { name: 'Selection Sort', complexity: 'O(n²)', icon: '🎯', stable: false, inPlace: true },
        { name: 'Insertion Sort', complexity: 'O(n²)', icon: '📥', stable: true, inPlace: true }
      ]
    },
    {
      id: 'efficient',
      name: 'Efficient Sorting',
      algorithms: [
        { name: 'Merge Sort', complexity: 'O(n log n)', icon: '🔀', stable: true, inPlace: false },
        { name: 'Quick Sort', complexity: 'O(n log n)', icon: '⚡', stable: false, inPlace: true },
        { name: 'Heap Sort', complexity: 'O(n log n)', icon: '🏔️', stable: false, inPlace: true }
      ]
    },
    {
      id: 'specialized',
      name: 'Specialized Sorting',
      algorithms: [
        { name: 'Counting Sort', complexity: 'O(n+k)', icon: '🔢', stable: true, inPlace: false },
        { name: 'Radix Sort', complexity: 'O(d×n)', icon: '📊', stable: true, inPlace: false },
        { name: 'Bucket Sort', complexity: 'O(n+k)', icon: '🪣', stable: true, inPlace: false },
        { name: 'Shell Sort', complexity: 'O(n^1.5)', icon: '🐚', stable: false, inPlace: true }
      ]
    }
  ];

  const implementations = {
    'bubble-sort': {
      title: 'Bubble Sort',
      description: 'Repeatedly compares adjacent elements and swaps them if in wrong order',
      timeComplexity: 'Best: O(n), Average: O(n²), Worst: O(n²)',
      spaceComplexity: 'O(1)',
      stable: true,
      inPlace: true,
      code: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        
        // Last i elements are already sorted
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) break;
    }
}

// Optimized version with early termination
void bubbleSortOptimized(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        if (!swapped) return; // Array is sorted
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Original array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    bubbleSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`
    },
    'merge-sort': {
      title: 'Merge Sort',
      description: 'Divide and conquer algorithm that splits array and merges sorted subarrays',
      timeComplexity: 'Best: O(n log n), Average: O(n log n), Worst: O(n log n)',
      spaceComplexity: 'O(n)',
      stable: true,
      inPlace: false,
      code: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temporary arrays
    vector<int> leftArr(n1), rightArr(n2);
    
    // Copy data to temporary arrays
    for (int i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        rightArr[j] = arr[mid + 1 + j];
    
    // Merge the temporary arrays back
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

// Wrapper function
void mergeSort(vector<int>& arr) {
    mergeSort(arr, 0, arr.size() - 1);
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    
    cout << "Original array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    mergeSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`
    },
    'quick-sort': {
      title: 'Quick Sort',
      description: 'Picks a pivot element and partitions array around it recursively',
      timeComplexity: 'Best: O(n log n), Average: O(n log n), Worst: O(n²)',
      spaceComplexity: 'O(log n)',
      stable: false,
      inPlace: true,
      code: `#include <iostream>
#include <vector>
#include <random>
using namespace std;

// Lomuto partition scheme
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // Choose last element as pivot
    int i = low - 1; // Index of smaller element
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// Hoare partition scheme (more efficient)
int hoarePartition(vector<int>& arr, int low, int high) {
    int pivot = arr[low];
    int i = low - 1, j = high + 1;
    
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        
        if (i >= j) return j;
        swap(arr[i], arr[j]);
    }
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Randomized Quick Sort for better average performance
void randomizedQuickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        // Random pivot selection
        random_device rd;
        mt19937 gen(rd());
        uniform_int_distribution<> dis(low, high);
        int randomIndex = dis(gen);
        
        swap(arr[randomIndex], arr[high]);
        
        int pi = partition(arr, low, high);
        
        randomizedQuickSort(arr, low, pi - 1);
        randomizedQuickSort(arr, pi + 1, high);
    }
}

// Wrapper function
void quickSort(vector<int>& arr) {
    quickSort(arr, 0, arr.size() - 1);
}

int main() {
    vector<int> arr = {10, 7, 8, 9, 1, 5};
    
    cout << "Original array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    quickSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`
    },
    'heap-sort': {
      title: 'Heap Sort',
      description: 'Builds a max heap and repeatedly extracts maximum element',
      timeComplexity: 'Best: O(n log n), Average: O(n log n), Worst: O(n log n)',
      spaceComplexity: 'O(1)',
      stable: false,
      inPlace: true,
      code: `#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i; // Initialize largest as root
    int left = 2 * i + 1; // Left child
    int right = 2 * i + 2; // Right child
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // Build heap (rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(arr[0], arr[i]);
        
        // Call heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

// Alternative implementation with iterative heapify
void iterativeHeapify(vector<int>& arr, int n, int i) {
    while (true) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest])
            largest = left;
        
        if (right < n && arr[right] > arr[largest])
            largest = right;
        
        if (largest == i) break;
        
        swap(arr[i], arr[largest]);
        i = largest;
    }
}

void printArray(const vector<int>& arr) {
    for (int x : arr) cout << x << " ";
    cout << endl;
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6, 7};
    
    cout << "Original array: ";
    printArray(arr);
    
    heapSort(arr);
    
    cout << "Sorted array: ";
    printArray(arr);
    
    return 0;
}`
    },
    'counting-sort': {
      title: 'Counting Sort',
      description: 'Sorts by counting occurrences of each distinct element',
      timeComplexity: 'Best: O(n+k), Average: O(n+k), Worst: O(n+k)',
      spaceComplexity: 'O(k)',
      stable: true,
      inPlace: false,
      code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSort(vector<int>& arr) {
    if (arr.empty()) return;
    
    // Find the range of input
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    // Create count array
    vector<int> count(range, 0);
    vector<int> output(arr.size());
    
    // Store count of each element
    for (int i = 0; i < arr.size(); i++)
        count[arr[i] - minVal]++;
    
    // Change count[i] to actual position of element in output array
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];
    
    // Build output array (traverse from right to maintain stability)
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }
    
    // Copy output array to original array
    for (int i = 0; i < arr.size(); i++)
        arr[i] = output[i];
}

// Optimized version for positive integers only
void countingSortPositive(vector<int>& arr) {
    if (arr.empty()) return;
    
    int maxVal = *max_element(arr.begin(), arr.end());
    vector<int> count(maxVal + 1, 0);
    
    // Count occurrences
    for (int num : arr)
        count[num]++;
    
    // Reconstruct sorted array
    int index = 0;
    for (int i = 0; i <= maxVal; i++) {
        while (count[i]-- > 0) {
            arr[index++] = i;
        }
    }
}

// Counting sort for specific range [0, k]
void countingSortRange(vector<int>& arr, int k) {
    vector<int> count(k + 1, 0);
    vector<int> output(arr.size());
    
    // Count occurrences
    for (int i = 0; i < arr.size(); i++)
        count[arr[i]]++;
    
    // Cumulative count
    for (int i = 1; i <= k; i++)
        count[i] += count[i - 1];
    
    // Build output array
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    // Copy back
    for (int i = 0; i < arr.size(); i++)
        arr[i] = output[i];
}

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1};
    
    cout << "Original array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    countingSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`
    },
    'radix-sort': {
      title: 'Radix Sort',
      description: 'Sorts numbers digit by digit using stable sorting algorithm',
      timeComplexity: 'Best: O(d×n), Average: O(d×n), Worst: O(d×n)',
      spaceComplexity: 'O(n+k)',
      stable: true,
      inPlace: false,
      code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Counting sort for specific digit (used by radix sort)
void countingSortByDigit(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    vector<int> count(10, 0);
    
    // Store count of occurrences in count[]
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    // Change count[i] to actual position in output[]
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    // Build output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    // Copy output array to arr[]
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(vector<int>& arr) {
    if (arr.empty()) return;
    
    // Find maximum number to know number of digits
    int maxNum = *max_element(arr.begin(), arr.end());
    
    // Do counting sort for every digit
    for (int exp = 1; maxNum / exp > 0; exp *= 10)
        countingSortByDigit(arr, exp);
}

// Radix sort for negative numbers
void radixSortWithNegatives(vector<int>& arr) {
    if (arr.empty()) return;
    
    vector<int> positive, negative;
    
    // Separate positive and negative numbers
    for (int num : arr) {
        if (num >= 0) positive.push_back(num);
        else negative.push_back(-num);
    }
    
    // Sort both arrays
    radixSort(positive);
    radixSort(negative);
    
    // Merge results
    arr.clear();
    
    // Add negative numbers in reverse order
    for (int i = negative.size() - 1; i >= 0; i--)
        arr.push_back(-negative[i]);
    
    // Add positive numbers
    for (int num : positive)
        arr.push_back(num);
}

// MSD (Most Significant Digit) Radix Sort
void msdRadixSort(vector<int>& arr, int left, int right, int exp) {
    if (left >= right || exp == 0) return;
    
    vector<vector<int>> buckets(10);
    
    // Distribute elements into buckets
    for (int i = left; i <= right; i++) {
        int digit = (arr[i] / exp) % 10;
        buckets[digit].push_back(arr[i]);
    }
    
    // Copy back and recursively sort each bucket
    int index = left;
    for (int i = 0; i < 10; i++) {
        int start = index;
        for (int num : buckets[i]) {
            arr[index++] = num;
        }
        
        if (buckets[i].size() > 1) {
            msdRadixSort(arr, start, index - 1, exp / 10);
        }
    }
}

int main() {
    vector<int> arr = {170, 45, 75, 90, 2, 802, 24, 66};
    
    cout << "Original array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    radixSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`
    },
    'shell-sort': {
      title: 'Shell Sort',
      description: 'Variation of insertion sort that allows exchange of far items',
      timeComplexity: 'Best: O(n log n), Average: O(n^1.25), Worst: O(n²)',
      spaceComplexity: 'O(1)',
      stable: false,
      inPlace: true,
      code: `#include <iostream>
#include <vector>
using namespace std;

void shellSort(vector<int>& arr) {
    int n = arr.size();
    
    // Start with a big gap, then reduce the gap
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Do a gapped insertion sort for this gap size
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            
            // Shift earlier gap-sorted elements up until correct location
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            
            arr[j] = temp;
        }
    }
}

// Shell sort with Knuth's gap sequence
void shellSortKnuth(vector<int>& arr) {
    int n = arr.size();
    
    // Generate gap sequence using Knuth's formula: 3^k - 1
    int gap = 1;
    while (gap < n / 3) {
        gap = 3 * gap + 1; // 1, 4, 13, 40, 121, ...
    }
    
    while (gap >= 1) {
        // h-sort the array
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
        
        gap /= 3;
    }
}

// Shell sort with Sedgewick's gap sequence
void shellSortSedgewick(vector<int>& arr) {
    int n = arr.size();
    
    // Sedgewick's gap sequence: 4^i + 3*2^(i-1) + 1
    vector<int> gaps;
    for (int i = 0; ; i++) {
        int gap;
        if (i % 2 == 0) {
            gap = 9 * (1 << (2 * i)) - 9 * (1 << i) + 1;
        } else {
            gap = 8 * (1 << (2 * i)) - 6 * (1 << (i + 1)) + 1;
        }
        
        if (gap >= n) break;
        gaps.push_back(gap);
    }
    
    // Sort using gaps in reverse order
    for (int g = gaps.size() - 1; g >= 0; g--) {
        int gap = gaps[g];
        
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
    }
}

// Shell sort with Hibbard's gap sequence
void shellSortHibbard(vector<int>& arr) {
    int n = arr.size();
    
    // Hibbard's sequence: 2^k - 1
    int gap = 1;
    while (gap < n) gap = 2 * gap + 1;
    gap /= 2;
    
    while (gap > 0) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
        
        gap /= 2;
    }
}

int main() {
    vector<int> arr = {12, 34, 54, 2, 3};
    
    cout << "Original array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    shellSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`
    }
  };

  return (
    <div className="sorting-algorithms-container">
      <div className="sorting-algorithms-page">
        {/* Header Section */}
        <div className="header-section">
          <h1>
            <span className="title-icon"></span>
            Sorting Algorithms
          </h1>
          <p>Master the art of arranging data efficiently with comprehensive sorting algorithm implementations</p>
        </div>

        {/* Categories Section */}
        <div className="categories-section">
          <h2>Algorithm Categories</h2>
          {sortingCategories.map((category) => (
            <div key={category.id} className="category-container">
              <h3 className="category-title">{category.name}</h3>
              <div className="algorithms-grid">
                {category.algorithms.map((algo, index) => (
                  <div key={index} className="algorithm-card">
                    <div className="algorithm-icon">{algo.icon}</div>
                    <div className="algorithm-info">
                      <h4>{algo.name}</h4>
                      <div className="algorithm-meta">
                        <span className="complexity-badge">{algo.complexity}</span>
                        <div className="properties">
                          {algo.stable && <span className="property stable">Stable</span>}
                          {algo.inPlace && <span className="property in-place">In-Place</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Examples */}
        <div className="implementations-section">
          <h2>C++ Implementations</h2>
          
          <div className="implementation-tabs">
            {Object.keys(implementations).map((key) => (
              <button
                key={key}
                className={`tab-button ${activeAlgorithm === key ? 'active' : ''}`}
                onClick={() => setActiveAlgorithm(key)}
              >
                {implementations[key].title}
              </button>
            ))}
          </div>

          <div className="implementation-content">
            <div className="implementation-header">
              <div className="implementation-info">
                <h3>{implementations[activeAlgorithm].title}</h3>
                <p className="implementation-description">
                  {implementations[activeAlgorithm].description}
                </p>
              </div>
              <div className="complexity-info">
                <div className="complexity-item">
                  <span className="complexity-label">Time:</span>
                  <span className="complexity-value">{implementations[activeAlgorithm].timeComplexity}</span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Space:</span>
                  <span className="complexity-value">{implementations[activeAlgorithm].spaceComplexity}</span>
                </div>
                <div className="properties-info">
                  <span className={`property-badge ${implementations[activeAlgorithm].stable ? 'stable' : 'unstable'}`}>
                    {implementations[activeAlgorithm].stable ? 'Stable' : 'Unstable'}
                  </span>
                  <span className={`property-badge ${implementations[activeAlgorithm].inPlace ? 'in-place' : 'not-in-place'}`}>
                    {implementations[activeAlgorithm].inPlace ? 'In-Place' : 'Not In-Place'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="code-container">
              <div className="code-header">
                <div className="code-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="code-lang">C++</span>
              </div>
              <pre className="code-block">
                <code>{implementations[activeAlgorithm].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style>{`
        .sorting-algorithms-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background:linear-gradient(135deg, rgb(149, 158, 221) 0%, #e3e2e4 50%, #d8d5d8 100%);
          min-height: 100vh;
          padding: 20px 0;
        }

        .sorting-algorithms-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header Section */
        .header-section {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }

        .header-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg,rgb(48, 80, 224), #764ba2, #f093fb, #f5576c);
        }

        .header-section h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .title-icon {
          font-size: 2.5rem;
        }

        .header-section p {
          font-size: 1.2rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Categories Section */
        .categories-section {
          margin-bottom: 60px;
        }

        .categories-section h2 {
          font-size: 2.2rem;
          font-weight: 600;
          color: white;
          text-align: center;
          margin-bottom: 40px;
        }

        .category-container {
          background: white;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .category-title {
          font-size: 1.6rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f3f4f6;
        }

        .algorithms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .algorithm-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .algorithm-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          background: white;
        }

        .algorithm-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .algorithm-info h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .algorithm-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .complexity-badge {
          display: inline-block;
          padding: 4px 8px;
          background: #dbeafe;
          color:rgb(160, 175, 216);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          width: fit-content;
        }

        .properties {
          display: flex;
          gap: 6px;
        }

        .property {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .property.stable {
          background: #dcfce7;
          color: #166534;
        }

        .property.in-place {
          background: #fef3c7;
          color: #92400e;
        }

        /* Implementations Section */
        .implementations-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .implementations-section h2 {
          font-size: 2.2rem;
          font-weight: 600;
          color: #1f2937;
          text-align: center;
          margin-bottom: 40px;
        }

        .implementation-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 30px;
          overflow-x: auto;
          padding-bottom: 8px;
          flex-wrap: wrap;
        }

        .tab-button {
          padding: 12px 20px;
          border: none;
          background: #f3f4f6;
          color: #6b7280;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-size: 0.85rem;
        }

        .tab-button:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .tab-button.active {
          background: linear-gradient(135deg,rgb(136, 151, 214), #764ba2);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .implementation-content {
          background: #f8fafc;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .implementation-header {
          padding: 24px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
        }

        .implementation-info h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .implementation-description {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .complexity-info {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .complexity-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .complexity-label {
          font-weight: 600;
          color: #374151;
        }

        .complexity-value {
          padding: 4px 8px;
          background: #f3e8ff;
          color:rgb(177, 147, 228);
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .properties-info {
          display: flex;
          gap: 8px;
        }

        .property-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .property-badge.stable {
          background: #dcfce7;
          color: #166534;
        }

        .property-badge.unstable {
          background: #fee2e2;
          color: #dc2626;
        }

        .property-badge.in-place {
          background: #fef3c7;
          color: #92400e;
        }

        .property-badge.not-in-place {
          background: #e0e7ff;
          color:rgb(145, 141, 212);
        }

        .code-container {
          position: relative;
        }

        .code-header {
          background: #1f2937;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .code-dots {
          display: flex;
          gap: 6px;
        }

        .code-dots span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #6b7280;
        }

        .code-dots span:nth-child(1) { background: #ef4444; }
        .code-dots span:nth-child(2) { background: #f59e0b; }
        .code-dots span:nth-child(3) { background: #10b981; }

        .code-lang {
          color: #9ca3af;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .code-block {
          background:rgb(34, 44, 59);
          color: #e5e7eb;
          padding: 24px;
          margin: 0;
          overflow-x: auto;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 14px;
          line-height: 1.6;
          max-height: 600px;
          overflow-y: auto;
        }

        .code-block code {
          color: #e5e7eb;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .sorting-algorithms-page {
            padding: 0 15px;
          }
          
          .header-section {
            padding: 40px 20px;
          }
          
          .header-section h1 {
            font-size: 2.2rem;
            flex-direction: column;
            gap: 8px;
          }
          
          .algorithms-grid {
            grid-template-columns: 1fr;
          }
          
          .implementations-section {
            padding: 24px;
          }
          
          .implementation-tabs {
            flex-direction: column;
          }
          
          .tab-button {
            text-align: center;
          }
          
          .complexity-info {
            flex-direction: column;
          }
          
          .code-block {
            font-size: 13px;
            padding: 16px;
          }
        }
          `}</style>
    </div>
  );
};
export default SortingAlgorithmsPage;