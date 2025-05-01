const { performance } = require("perf_hooks");

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacciBenchmark(n) {
  console.log(`Starting fibonacci benchmark for ${n}`);
  const start = performance.now();
  const startTime = Date.now();
  const x = fibonacci(n);
  const end = performance.now();
  const endTime = Date.now();
  console.log(`Fibonacci benchmark took ${end - start} milliseconds`);
  return {
    input: n,
    executionTime: end - start,
    functionName: 'fibonacci',
    output: x,
    startTime: startTime,
    endTime: endTime
  }
}

module.exports = fibonacciBenchmark;
