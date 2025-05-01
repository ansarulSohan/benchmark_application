const { performance } = require("perf_hooks");
const express = require("express");
const app = express();

const DEFAULT_NUMBER = 99999999;

const bubbleSortBenchmark = require("./benchmarks/bubbleSort");
const semiPrimeBenchmark = require("./benchmarks/semiPrime");
const fibonacciBenchmark = require("./benchmarks/fibonacci");
const hashingBenchmark = require("./benchmarks/hashing");
const factorialBenchmark = require("./benchmarks/factorial");
const data = require("./data/randomData");

app.get("/", (req, res) => {
  res.send("Hello World! API is running!");
});

app.get("/bubbleSort", async (req, res) => {
  try {
    const length = parseInt(req.query.length) || 10000;
    const results = await bubbleSortBenchmark(length);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error in bubbleSort endpoint:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/factorial", async (req, res) => {
  const num = req.query.number || 25;
  const result = factorialBenchmark(num);
  res.status(200).send(result);
});

app.get("/semiPrime", async (req, res) => {
  console.log(`[semiPrime] Query Parameter: ${req.query.number}`);
  const num = parseInt(req.query.number || DEFAULT_NUMBER);
  const result = semiPrimeBenchmark(num);
  res.status(200).send(result);
});

app.get("/hashing", async (req, res) => {
  const duration = req.query.time || 600000;
  const input = req.query.input || "Random Input String";
  const result = await hashingBenchmark(duration, input);
  console.log(result);
  res.status(200).send(result);
});

app.get("/fibonacci", async (req, res) => {
  const number = req.query.number;
  if (!number) {
    number = DEFAULT_NUMBER;
  }
  const result = await fibonacciBenchmark(number);
  res.status(200).send(result);
});

app.get("/data", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  res.send(data[randomNumber]);
});
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
