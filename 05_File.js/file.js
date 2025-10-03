const fs = require('fs')   //extracting the inbuilt package

//Write file
//Sync...
// fs.writeFileSync("./text.txt", "Writing file Sync...")

//Async...
// fs.writeFile("./text.txt", "Writing file Async...", (err) => {})

//Read file
//Sync...      it returns the content
// const readContent = fs.readFileSync("./contacts.txt", "utf-8")    // 'utf-8' -> normal encoding
// console.log(readContent)

// //Async...     it doesn't return the content, stores the result in passed parameter, it generates the error if we tried it as Sync...
// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//     if(err)
//     {
//         console.log("Something went wrong while reading the file...")
//     }
//     else{
//         console.log(result)
//     }
// })

//Append file

const myDate = new Date();
let content = myDate.toLocaleString();
fs.appendFileSync("./text.txt", `\n${content}`)

// Copy File

// fs.cpSync("./text.txt", "./copy.txt")

//Delete File

// fs.unlinkSync("./copy.txt")

//Stats of File

console.log(fs.statSync("./text.txt"))