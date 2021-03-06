const { getRandomIndex } = require("../utils")
const { parentPort, workerData } = require("worker_threads")
const fs = require('fs-extra');
const firstName = require("../data/first_name.json");
const middleName = require("../data/middle_name.json");
const lastName = require("../data/last_name.json");



parentPort.on('message', (workerData) => {
    const { namesPerThread, outputFile, i } = workerData;
    var result;
    (async () => {
        thread = "Thread " + i;
        console.time(thread)
        for (let i = 0; i < namesPerThread; i++) {
            const data = [firstName, middleName, lastName].map(getRandomIndex).concat("\n").join(" ");
            await fs.appendFile(outputFile, data);
        }
        result = "Done!!!"
        console.timeEnd(thread)
        parentPort.postMessage(result);
    })();
});


