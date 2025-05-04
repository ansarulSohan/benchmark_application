const fs = require('fs');
const path = require('path');


const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
};






async function mergeSortBenchmark(length = 200000) {
  try {
    const sampleArrayPath = path.join(__dirname, '../data/array_sample_1.json');
    const sampleData = JSON.parse(fs.readFileSync(sampleArrayPath, 'utf8'));


    const arr = sampleData.array.slice(0, length);
    console.log(`Starting bubbleSortBenchmark with array length ${arr.length}`);

    const start = performance.now();
    const startTime = Date.now();
    const sortedArr = mergeSort([...arr]); // Create a copy to not modify original
    const end = performance.now();
    const endTime = Date.now();

    console.log(`merge sort benchmark took ${end - start} milliseconds`);

    return {
      input: arr.length,
      executionTime: end - start,
      functionName: 'mergeSort',
      output: "N/A",
      startTime: startTime,
      endTime: endTime
    };
  } catch (error) {
    console.error('Error in mergeSortBenchmark:', error);
    throw error;
  }
}
