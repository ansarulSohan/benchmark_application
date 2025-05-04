const crypto = require('crypto');

/**
 * Performs complex hashing operations for a specified duration
 * @param {number} durationMs - Duration to run the hashing in milliseconds
 * @param {string} [input='default'] - Input string to hash
 * @returns {Object} - Object containing hash results and statistics
 */
async function complexHashing(durationMs, input = 'default') {
    const startTime = performance.now();
    const startTime2 = Date.now();
    let iterations = 0;
    let lastHash = input;
    const hashTypes = ['sha256'];

    function performComplexHash(input) {
        let currentHash = input;
        const hash = crypto.createHash(hashTypes[0]);
        hash.update(currentHash);
        currentHash = hash.digest('hex');
        currentHash = currentHash.split('').reverse().join('');
        currentHash = Buffer.from(currentHash).toString('base64');

        return currentHash;
    }

    while (performance.now() - startTime < durationMs) {
        lastHash = performComplexHash(lastHash);
        iterations++;
    }

    const endTime = performance.now();
    const endTime2 = Date.now();
    const actualDuration = endTime - startTime;
    console.log(actualDuration);
    console.log(iterations);
    if (global.gc) global.gc();

    return {
        finalHash: lastHash,
        iterations: iterations,
        executionTime: actualDuration,
        input: durationMs,
        functionName: 'hashing',
        output: (iterations / (actualDuration / 1000)).toFixed(2),
        startTime: startTime2,
        endTime: endTime2
    };
}

// if (require.main === module) {
//     const duration = process.argv[2] ? parseInt(process.argv[2]) : 5000; // Default 5 seconds
//     const input = process.argv[3] || 'default';

//     console.log("Hashing for " + duration + "ms || " + `${duration / 60000}` + " minutes");
//     console.log("Input: " + input);

//     complexHashing(duration, input)
//         .then(results => {
//             console.log(`Final Hash: ${results.finalHash}`);
//             console.log(`Iterations: ${results.iterations}`);
//             console.log(`Duration: ${results.durationMs}ms`);
//             console.log(`Hashes per second: ${results.hashesPerSecond}`);
//         })
//         .catch(error => {
//             console.error('Error during hashing:', error);
//         });
// }

module.exports = complexHashing; 