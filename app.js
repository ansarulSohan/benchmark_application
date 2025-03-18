const { performance } = require("perf_hooks");
const express = require("express");
const app = express();

const bubbleSortBenchmark = require("./benchmarks/bubbleSort");
const semiPrimeBenchmark = require("./benchmarks/semiPrime");
const fibonacciBenchmark = require("./benchmarks/fibonacci");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/bubbleSort", (req, res) => {
  const number = req.query.number | Number.MAX_SAFE_INTEGER;
  bubbleSortBenchmark(number);
  res.status(200).send("Bubble sort benchmark completed");
});

app.get("/semiPrime", (req, res) => {
  const number = parseInt(req.query.number) | Number.MAX_SAFE_INTEGER;
  console.log(number);
  semiPrimeBenchmark(number);
  res.status(200).send("Semi prime benchmark completed");
});

app.get("/fibonacci", (req, res) => {
  const number = req.query.number | Number.MAX_SAFE_INTEGER;
  console.log(number);
  fibonacciBenchmark(number);
  res.status(200).send("Fibonacci benchmark completed");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
