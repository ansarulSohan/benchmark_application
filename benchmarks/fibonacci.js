function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacciBenchmark(n) {
  console.log(`Starting fibonacci benchmark for ${n}`);
  const start = performance.now();
  const x = fibonacci(n);
  console.log(x);
  const end = performance.now();
  console.log(`Fibonacci benchmark took ${end - start} milliseconds`);
  console.log(`Fibonacci benchmark took ${(end - start) / 60000} Minutes`);
}

module.exports = fibonacciBenchmark;
