const { performance } = require("perf_hooks");

function isSemiPrime(n) {
  let count = 0;
  for (let i = 2; count < 2 && i * i <= n; i++) {
    while (n % i === 0) {
      n /= i;
      count++;
    }
  }
  if (n > 1) {
    count++;
  }
  return count === 2;
}

function findAllSemiPrime(n) {
  for (let i = 2; i <= n; i++) {
    isSemiPrime(i);
  }
}

async function semiPrimeBenchmark(num, iterations = 1) {
  console.log(`Starting isSemiPrime benchmark for ${num} with ${iterations} iterations`);
  
  const results = {
    iterations: [],
    averageExecutionTime: 0,
    averageMemoryUsage: 0,
    totalExecutionTime: 0,
    totalMemoryUsage: 0,
    inputSize: num,
    iterationsCount: iterations
  };

  for (let i = 0; i < iterations; i++) {
    const startMemory = process.memoryUsage();
    const start = performance.now();
    
    findAllSemiPrime(num);
    
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
  
  console.log(`SemiPrime benchmark completed`);
  console.log(`Average execution time: ${results.averageExecutionTime}ms`);
  console.log(`Average memory usage: ${(results.averageMemoryUsage / 1024 / 1024).toFixed(2)}MB`);
  
  return results;
}

module.exports = semiPrimeBenchmark;
