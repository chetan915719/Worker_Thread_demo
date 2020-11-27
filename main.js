const { Worker } = require("worker_threads");

const limit = 1000000;
const threads = 10;
const namesPerThread = limit / threads;
const outputFile = './output/data.txt';

let names = [...Array(threads)].fill(0);

function runWorker(){
    return new Promise((resolve, reject) => {
        for (let i = 0; i < threads; i++) {
            const port = new Worker(require.resolve("./worker.js"), {
                workerData: { namesPerThread, outputFile, i }
            });
            port.on("message", resolve);
            port.on("error", reject);
            port.on("exit", (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        }
    });
}

runWorker();