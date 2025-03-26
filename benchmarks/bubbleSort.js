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

async function bubbleSortBenchmark() {
  try {
    // Read the sample array from JSON file
    const sampleArrayPath = path.join(__dirname, '../data/array_sample_1.json');
    const sampleData = JSON.parse(fs.readFileSync(sampleArrayPath, 'utf8'));
    const arr = sampleData.array;

    console.log(`Starting bubbleSortBenchmark with array length ${arr.length}`);
    console.log('First 10 elements of input array:', arr.slice(0, 10));

    const start = performance.now();
    const sortedArr = bubbleSort([...arr]); // Create a copy to not modify original
    const end = performance.now();

    console.log('First 10 elements of sorted array:', sortedArr.slice(0, 10));
    console.log(`Bubble sort benchmark took ${end - start} milliseconds`);
    console.log(`Bubble sort benchmark took ${(end - start) / 60000} Minutes`);

    return {
      inputLength: arr.length,
      executionTime: end - start,
      executionTimeMinutes: (end - start) / 60000,
      firstTenInput: arr.slice(0, 10),
      firstTenOutput: sortedArr.slice(0, 10)
    };
  } catch (error) {
    console.error('Error in bubbleSortBenchmark:', error);
    throw error;
  }
}

module.exports = bubbleSortBenchmark;
