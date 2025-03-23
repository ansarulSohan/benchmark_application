const { performance } = require("perf_hooks");

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const generateRandomArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * length));
  }
  return arr;
};

async function bubbleSortBenchmark(length = 100000, iterations = 1) {
  console.log(`Starting bubbleSortBenchmark with length ${length} and ${iterations} iterations`);
  
  const results = {
    iterations: [],
    averageExecutionTime: 0,
    averageMemoryUsage: 0,
    totalExecutionTime: 0,
    totalMemoryUsage: 0,
    inputSize: length,
    iterationsCount: iterations
  };

  for (let i = 0; i < iterations; i++) {
    const arr = generateRandomArray(length);
    const startMemory = process.memoryUsage();
    const start = performance.now();
    
    bubbleSort(arr);
    
    const end = performance.now();
    const endMemory = process.memoryUsage();
    
    const executionTime = end - start;
    const memoryUsage = endMemory.heapUsed - startMemory.heapUsed;
    
    results.iterations.push({
      iteration: i + 1,
      executionTime,
      memoryUsage,
      timestamp: new Date().toISOString()
    });
    
    results.totalExecutionTime += executionTime;
    results.totalMemoryUsage += memoryUsage;
  }
  
  results.averageExecutionTime = results.totalExecutionTime / iterations;
  results.averageMemoryUsage = results.totalMemoryUsage / iterations;
  
  console.log(`Bubble sort benchmark completed`);
  console.log(`Average execution time: ${results.averageExecutionTime}ms`);
  console.log(`Average memory usage: ${(results.averageMemoryUsage / 1024 / 1024).toFixed(2)}MB`);
  
  return results;
}

module.exports = bubbleSortBenchmark;
