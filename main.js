const WorkerPool = require('./worker_pool/worker_pool.js');
const os = require('os');
const path = require('path');
resolve = require('path').resolve;

const limit = 1000;
const threads = 10;
const namesPerThread = limit / threads;
const outputFile = resolve('./output/data.txt')
const workerTask = 'task_processor.js'

const pool = new WorkerPool(threads,workerTask);

let finished = 0;
for (let i = 0; i < threads; i++) {
  pool.runTask({namesPerThread, outputFile, i }, (err, result) => {
    if (++finished === threads)
      pool.close();
  });
}