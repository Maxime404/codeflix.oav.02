const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

function transformStdout(fileName, re, cb, inStdout) {
    const ext = path.extname(fileName);
    const base = path.basename(fileName, ext);
    const outputFileName = `${base}.duplicate${ext}`;

    let rstream = fs.createReadStream(fileName);

    if (inStdout) {
        let content = '';

        rstream.on('data', chunk => {
            content += chunk.toString().replace(re, cb);
        })

        rstream.on('end', () => {
            console.log(content)
        })
    } else {
        let wstream = fs.createWriteStream(outputFileName);


        const tstream = new Transform({
            transform(chunk, encoding, callback) {
                this.push(chunk.toString().replace(re, str => cb(str)));
                callback();
            }
        });
        rstream.pipe(tstream).pipe(wstream);
    }
    console.log(`File ${outputFileName} successfully transformed!`);
}

module.exports = {
    transformStdout
}