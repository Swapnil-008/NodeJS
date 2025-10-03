const http = require('http')
const { listenerCount } = require('process')
const fs = require('fs')

fs.writeFileSync('./text.txt', "New File Created\n")

const myServer = http.createServer((req, res) => {
    // console.log(req.headers)
    // if(req.url !== "/favicon.ico")  // To aviod the double visit
    // {
    //     fs.appendFile('./07_Building_HTTP_Server/text.txt', "New Request Added!\n", (err, data) => {
    //     res.end("Hello from server!")
    // })
    // }
    const content = `New Request Added!, Time: ${new Date().toLocaleString()}, ${req.url} \n`
    fs.appendFile('./text.txt', content, (err, data) => {
        if(req.url === '/')
        {
            res.end("Welcome to Home!")
        }
        else if(req.url === '/about')
        {
            res.end("Welcome to About!")
        }
        else{
            res.end("Welcome to Favicon!")
        }
    })
    
})

const PORT = 8000

myServer.listen(PORT, () => {
    console.log("Server started!")
})