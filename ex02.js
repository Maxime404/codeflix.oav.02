const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

function transform(fileName, re, cb) {
    const ext = path.extname(fileName);
    const base = path.basename(fileName, ext);

    const outputFileName = `${base}.duplicate${ext}`;

    let rstream = fs.createReadStream(fileName);
    let wstream = fs.createWriteStream(outputFileName);

    const tstream = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().replace(re, str => cb(str)));
            callback();
        }
    });
    rstream.pipe(tstream).pipe(wstream);
    console.log(`File ${outputFileName} successfully transformed!`);
}

module.exports = {
    transform
}