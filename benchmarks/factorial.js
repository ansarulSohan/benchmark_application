const factorial = (n) => {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}


async function factorialBenchmark(num = 25) {
    const startTime = Date.now();
    const result = factorial(num);
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`Factorial of 10:${result} and took ${duration}ms`);
    return {
        input: num,
        output: result,
        executionTime: duration,
        functionName: 'factorial'
    }
}

module.exports = factorialBenchmark;

