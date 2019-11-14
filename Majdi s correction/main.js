const { duplicate, transform } = require('./streambox')
const { upperCase } = require('voca')

if (process.argv.length !== 3) {
  console.log('usage: node main.js <FILENAME>')
  process.exit(1)
}

const fileName = process.argv[2]
// duplicate(fileName)

transform(fileName, /Chopin/g, upperCase)
transform(fileName, /Chopin/g, upperCase, false)
