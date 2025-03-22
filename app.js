const { performance } = require("perf_hooks");
const express = require("express");

const os = require("os");
const cluster = require("cluster");

const numberOfCores = os.cpus().length;



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

if (cluster.isMaster) {
  console.log(`Master process is running on ${numberOfCores} cores`);
  for (let i = 0; i < numberOfCores; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.id} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}


