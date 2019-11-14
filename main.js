const fs = require('fs');
const { duplicate } = require('./ex01');
const { transform } = require('./ex02');
const { voca } = require('voca');

const args = process.argv.slice(2);

if (args.length !== 1) {
    console.log(`usage: node ${__filename.split('/').pop()} <CONFIG_FILENAME>`);
    process.exit(0);
}

const fileName = args[0];

if (!fs.existsSync(fileName)) {
    console.log(`The file : ${fileName} does not exist.`)
    process.exit(0);
}

duplicate(fileName);
transform(fileName, /Chopin/g, function(strToReplace) {
    return 'Fabian';
    //return strToReplace.toUpperCase();
});

