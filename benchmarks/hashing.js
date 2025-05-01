const crypto = require('crypto');

/**
 * Performs complex hashing operations for a specified duration
 * @param {number} durationMs - Duration to run the hashing in milliseconds
 * @param {string} [input='default'] - Input string to hash
 * @returns {Object} - Object containing hash results and statistics
 */
async function complexHashing(durationMs, input = 'default') {
    const startTime = Date.now();
    let iterations = 0;
    let lastHash = input;
    const hashTypes = ['sha256', 'sha512', 'md5', 'sha1'];

    function performComplexHash(input) {
        let currentHash = input;

        for (const algo of hashTypes) {
            const hash = crypto.createHash(algo);
            hash.update(currentHash);
            currentHash = hash.digest('hex');
            currentHash = currentHash.split('').reverse().join('');
            currentHash = Buffer.from(currentHash).toString('base64');
        }

        return currentHash;
    }

    while (Date.now() - startTime < durationMs) {
        lastHash = performComplexHash(lastHash);
        iterations++;
    }

    const endTime = Date.now();
    const actualDuration = endTime - startTime;

    return {
        finalHash: lastHash,
        iterations: iterations,
        executionTime: actualDuration,
        input: input,
        functionName: 'hashing',
        output: (iterations / (actualDuration / 1000)).toFixed(2)
    };
}

if (require.main === module) {
    const duration = process.argv[2] ? parseInt(process.argv[2]) : 5000; // Default 5 seconds
    const input = process.argv[3] || 'default';

    console.log("Hashing for " + duration + "ms || " + `${duration / 60000}` + " minutes");
    console.log("Input: " + input);

    complexHashing(duration, input)
        .then(results => {
            console.log(`Final Hash: ${results.finalHash}`);
            console.log(`Iterations: ${results.iterations}`);
            console.log(`Duration: ${results.durationMs}ms`);
            console.log(`Hashes per second: ${results.hashesPerSecond}`);
        })
        .catch(error => {
            console.error('Error during hashing:', error);
        });
}

module.exports = complexHashing; 