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

function semiPrimeBenchmark(num) {
  const start = performance.now();
  findAllSemiPrime(num);
  const end = performance.now();
  console.log(`isSemiPrime benchmark took ${end - start} milliseconds`);
  console.log(`isSemiPrime benchmark took ${(end - start) / 60000} Minutes`);
}

module.exports = semiPrimeBenchmark;
