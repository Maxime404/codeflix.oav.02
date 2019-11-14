const fs = require('fs')
const path = require('path')
const { Transform } = require('stream')

function getDuplicateName(fileName) {
  const ext = path.extname(fileName)
  const base = path.basename(fileName, ext)

  return `${base}.duplicate${ext}`
}

function duplicate(fileName) {
  const outputFileName = getDuplicateName(fileName)

  const rstream = fs.createReadStream(fileName)
  const wstream = fs.createWriteStream(outputFileName)

  rstream.pipe(wstream)
  console.log(`File ${outputFileName} successfully duplicated!`)
}

function transform(fileName, re, cb, inStdout = true) {
  const outputFileName = getDuplicateName(fileName)
  const rstream = fs.createReadStream(fileName)

  if (inStdout) {
    let content = ''

    rstream.on('data', chunk => {
      content += chunk.toString().replace(re, cb)
    })

    rstream.on('end', () => {
      console.log(content)
    })
  } else {
    const wstream = fs.createWriteStream(outputFileName)

    const tstream = new Transform({
      transform(chunk, encoding, callback) {
        this.push(chunk.toString().replace(re, cb))

        callback()
      }
    })

    rstream.pipe(tstream).pipe(wstream)
  }
}

module.exports = {
  duplicate,
  transform
}
