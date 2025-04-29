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
    console.error('Error in bubbleSort endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/factorial", (req, res) => {
  const num = req.query.number || 25;
  factorialBenchmark(num);
  res.status(200).send("Factorial benchmark completed");
});

app.get("/semiPrime", (req, res) => {
  console.log(`[semiPrime] Query Parameter: ${req.query.number}`);
  const num = parseInt(req.query.number);
  if (!num) {
    num = DEFAULT_NUMBER;
    console.log("[semiPrime] Proceeding with default number.")
  }
  semiPrimeBenchmark(num);
  res.status(200).send("Semi prime benchmark completed");
});

app.get("/hashing", (req, res) => {
  const duration = req.query.time || 600000;
  const input = req.query.input || "Random Input String";
  hashingBenchmark(duration, input);
  res.status(200).send("Hashing benchmark completed");
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

app.get("/data", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  res.send(data[randomNumber]);
});

// if (cluster.isMaster) {
//   console.log(`Master process is running on ${numberOfCores} cores`);
//   for (let i = 0; i < numberOfCores; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.id} died`);
//     cluster.fork();
//   });
// } else {
//   const port = process.env.PORT || 3000;
//   console.log(`Worker ${process.pid} started at ${port}`);
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// }

app.listen(3000, () => { console.log("Server running at port 3000") })


