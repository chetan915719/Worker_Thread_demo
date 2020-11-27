const { getRandomIndex } = require("../utils")
const { parentPort, workerData } = require("worker_threads")
const fs = require('fs-extra');
const firstName = require("../data/first_name.json");
const middleName = require("../data/middle_name.json");
const lastName = require("../data/last_name.json");

const { namesPerThread, outputFile, i } = workerData;

(async () => {
    thread = "Thread " + i;
    console.time(thread)
    for (let i = 0; i < namesPerThread; i++) {
        const data = [firstName, middleName, lastName].map(getRandomIndex).concat("\n").join(" ");
        await fs.appendFile(outputFile, data);
        parentPort.postMessage(data);
    }
    console.timeEnd(thread)
})();