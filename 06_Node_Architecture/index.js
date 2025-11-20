// How the node js works?

// Step 1: Client/User sends a request to the Node.js server.
// Step 2: The request reaches the Event Loop (NOT directly enqueued into the Event Queue).
// Step 3: The Event Loop inspects the type of operation requested.
// Step 4: If the operation is NON-BLOCKING I/O (e.g., network request, async file read):
//         → Node delegates the operation to the OS Kernel.
//         → OS performs the task in background.
//         → When completed, the callback is placed into the Event Queue.
// Step 5: If the operation requires THREAD POOL (e.g., crypto, compression, DNS lookup, async fs):
//         → The Event Loop sends the task to Thread Pool.
//         → Threads perform the heavy work.
//         → When finished, the callback is placed into the Event Queue.
// Step 6: If the operation is SYNCHRONOUS (blocking JavaScript code):
//         → It executes immediately on the main thread.
//         → This blocks the Event Loop until it completes.
// Step 7: The Event Loop continuously checks the Event Queue:
//         → When the call stack is empty, it pushes the next callback from the queue and executes it.
// Step 8: The result is returned back to the client.

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