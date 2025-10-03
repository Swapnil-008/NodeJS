// How the node js works?

//Step1: Client/user sends the request.
//Step2: That request enques into Event Queue.
//Step3: Event Loop starts to perform the requests one by one from Event Queue.
//Step4: Event Loop checks whether the request is blocking or non-blocking.
//Step5: If it is non-blocking request then simply performs the operation and return the result.
//Step6: If it is blocking request, then it checks the Thread Pool, whether any thread is available to perform the operation or not, and if the request is not available then it waits in free of thread, and then performs the operation and return the result. 

// Default Thread Pool size = 4.
// Max = No. of CPUs.

const fs = require('fs')
const os = require('os')

fs.writeFileSync('./text.txt', "Hello World!")

// //Blocking request -> Doesn't allow to perform the other operations until it completes execution.

// console.log("1")
// const result = fs.readFileSync("./text.txt", 'utf-8')
// console.log(result)
// console.log("2")
// console.log("3")

//Non-Blocking request -> allow to perform the other operations while performing the current one.

console.log("1")
fs.readFile("./text.txt", 'utf-8', (err, result) => {
    if(!err)
    {
        console.log(result)
    }
})
console.log("2")
console.log("3")
console.log(`No. of CPUs: ${os.cpus().length}`)