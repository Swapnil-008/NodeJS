// require() is a function in Node.js that is used to import things.
// Inbuilt Node packages
// Packages installed via npm
// Your own local files

const {add, sub} = require('./math')

console.log(`Add: ${add(10, 15)}, Sub: ${sub(25, 10)}`)