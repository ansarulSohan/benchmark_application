const { performance } = require("perf_hooks");
const express = require("express");
const app = express();

const DEFAULT_NUMBER = 99999999;

const bubbleSortBenchmark = require("./benchmarks/bubbleSort");
const semiPrimeBenchmark = require("./benchmarks/semiPrime");
const fibonacciBenchmark = require("./benchmarks/fibonacci");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/bubbleSort", (req, res) => {
  const number = req.query.number;
  if (!number) {
    number = DEFAULT_NUMBER;
  }
  bubbleSortBenchmark(number);
  res.status(200).send("Bubble sort benchmark completed");
});

app.get("/semiPrime", (req, res) => {
  console.log(req.query.number);
  const num = parseInt(req.query.number);
  if (!num) {
    num = DEFAULT_NUMBER;
  }
  console.log(num);
  semiPrimeBenchmark(num);
  res.status(200).send("Semi prime benchmark completed");
});

app.get("/fibonacci", (req, res) => {
  const number = req.query.number;
  console.log(number);
  if (!number) {
    number = DEFAULT_NUMBER;
  }
  fibonacciBenchmark(number);
  res.status(200).send("Fibonacci benchmark completed");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
