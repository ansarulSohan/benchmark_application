const fs = require('fs');
const path = require('path');

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

async function bubbleSortBenchmark(length = 10000) {
  try {
    // Read the sample array from JSON file
    const sampleArrayPath = path.join(__dirname, '../data/array_sample_1.json');
    const sampleData = JSON.parse(fs.readFileSync(sampleArrayPath, 'utf8'));

    const arr = sampleData.array.slice(0, length);
    console.log(`Starting bubbleSortBenchmark with array length ${arr.length}`);

    const start = performance.now();
    const sortedArr = bubbleSort([...arr]); // Create a copy to not modify original
    const end = performance.now();

    console.log(`Bubble sort benchmark took ${end - start} milliseconds`);

    return {
      inputLength: arr.length,
      executionTime: end - start,
      executionTimeInMinutes: (end - start) / 60000,
    };
  } catch (error) {
    console.error('Error in bubbleSortBenchmark:', error);
    throw error;
  }
}

module.exports = bubbleSortBenchmark;
