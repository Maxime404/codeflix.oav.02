const fs = require('fs');
const path = require('path');

function duplicate(fileName) {
    const ext = path.extname(fileName);
    const base = path.basename(fileName, ext);

    const outputFileName = `${base}.duplicate${ext}`;

    let rstream = fs.createReadStream(fileName);
    let wstream = fs.createWriteStream(outputFileName);

    rstream.pipe(wstream);
    console.log(`File ${outputFileName} successfully duplicated!`);
}

module.exports = {
    duplicate
}