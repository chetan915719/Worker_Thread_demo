const firstName = require("../data/first_name.json");
const middleName = require("../data/middle_name.json");
const lastName = require("../data/last_name.json");
const fs = require('fs-extra');
const {getRandomIndex} = require("../utils")

const outputFile = '../output/data.txt';

const limit = 1000;

console.time();
(async()=>{
    for (let i = 0; i < limit; i++){
        const data = [firstName, middleName, lastName].map(getRandomIndex).concat("\n").join(" ");
        await fs.appendFile(outputFile,data);
        if(i==limit-1){
            console.timeEnd();
        }
    }
})();