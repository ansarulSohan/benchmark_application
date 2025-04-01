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
  let semiPrime_count = 0;
  for (let i = 2; i <= n; i++) {
    if(isSemiPrime(i)) semiPrime_count++;
    
  }
  return semiPrime_count;
}

function semiPrimeBenchmark(num) {
  console.log(`Starting isSemiPrime benchmark for ${num}`);
  const start = performance.now();
  const semiPrime_count = findAllSemiPrime(num);
  const end = performance.now();
  console.log(`Found ${semiPrime_count} in range of 0 - ${num}`)
  console.log(`isSemiPrime benchmark took ${end - start} milliseconds`);
  console.log(`isSemiPrime benchmark took ${(end - start) / 60000} Minutes`);
}

module.exports = semiPrimeBenchmark;
