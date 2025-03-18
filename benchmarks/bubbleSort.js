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
const generateRandomArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * length));
  }
  return arr;
};

function bubbleSortBenchmark(length) {
  const arr = generateRandomArray(length);
  const start = performance.now();
  bubbleSort(arr);
  const end = performance.now();
  console.log(`Bubble sort benchmark took ${end - start} milliseconds`);
}

module.exports = bubbleSortBenchmark;
