const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

function csv2json(fileName) {
    const ext = path.extname(fileName);
    const base = path.basename(fileName, ext);
    const outputFileName = `${base}.json`;

    let rstream = fs.createReadStream(fileName);

    let wstream = fs.createWriteStream(outputFileName);


    const tstream = new Transform({
        transform(chunk, encoding, callback) {
            const content = chunk.toString();
            const [contentKeys, contentValues] = content.split('\n');
            const keys = contentKeys.split(';');
            const values = contentValues.split(';');
            const obj = {};

            if (keys.length === values.length) {
                for(i in keys) {
                    obj[keys[i]] = values[i];
                }
            }

            this.push(obj);
            callback();
        }
    });
    rstream.pipe(tstream).pipe(wstream);

    console.log(`File ${outputFileName} successfully converted!`);
}

module.exports = {
    csv2json
}