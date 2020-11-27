const WorkerPool = require('./worker_pool.js');
const os = require('os');

const limit = 1000000;
const threads = 10;
const namesPerThread = limit / threads;
const outputFile = '../output/data.txt';
const workerTask = 'task_processor.js'

const pool = new WorkerPool(threads,workerTask);

let finished = 0;
for (let i = 0; i < threads; i++) {
  pool.runTask({namesPerThread, outputFile, i }, (err, result) => {
    if (++finished === threads)
      pool.close();
  });
}