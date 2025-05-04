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

async function bubbleSortBenchmark(length = 200000) {
  try {
    const sampleArrayPath = path.join(__dirname, '../data/array_sample_2.json');
    const sampleData = JSON.parse(fs.readFileSync(sampleArrayPath, 'utf8'));

    const arr = sampleData.array.slice(0, length);
    console.log(`Starting bubbleSortBenchmark with array length ${arr.length}`);

    const start = performance.now();
    const startTime = Date.now();
    const sortedArr = bubbleSort([...arr]); // Create a copy to not modify original
    const end = performance.now();
    const endTime = Date.now();

    console.log(`Bubble sort benchmark took ${end - start} milliseconds`);

    return {
      input: arr.length,
      executionTime: end - start,
      functionName: 'bubbleSort',
      output: "N/A",
      startTime: startTime,
      endTime: endTime
    };
  } catch (error) {
    console.error('Error in bubbleSortBenchmark:', error);
    throw error;
  }
}

module.exports = bubbleSortBenchmark;
