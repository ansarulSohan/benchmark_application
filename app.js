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
  res.status(200).send("Hello World! API is running!");
});

app.get("/bubbleSort", async (req, res) => {
  try {
    const length = parseInt(req.query.length) || 10000;
    const results = await bubbleSortBenchmark(length);
    res.status(200).send(results);
  } catch (error) {
    console.error("Error in bubbleSort endpoint:", error);
    res.status(500).send(error.message);
  }
});

app.get("/factorial", async (req, res) => {
  try {
    const num = req.query.number || 25;
    const result = factorialBenchmark(num);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error in factorial endpoint:", error);
    res.status(500).send(error.message);
  }
});

app.get("/semiPrime", async (req, res) => {
  try {
    console.log(`[semiPrime] Query Parameter: ${req.query.number}`);
    const num = parseInt(req.query.number || DEFAULT_NUMBER);
    const result = semiPrimeBenchmark(num);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error in semiPrime endpoint:", error);
    res.status(500).send(error.message);
  }
});

app.get("/hashing", async (req, res) => {
  try {
    const duration = req.query.time || 600000;
    const input = req.query.input || "Random Input String";
    const result = await hashingBenchmark(duration, input);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error in hashing endpoint:", error);
    res.status(500).send(error.message);
  }
});

app.get("/fibonacci", async (req, res) => {
  try {
    const number = req.query.number || DEFAULT_NUMBER;
    const result = await fibonacciBenchmark(number);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error in fibonacci endpoint:", error);
    res.status(500).send(error.message);
  }
});

app.get("/data", (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    res.status(200).send(data[randomNumber]);
  } catch (error) {
    console.error("Error in data endpoint:", error);
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
