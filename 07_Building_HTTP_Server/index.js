const http = require('http')
const { listenerCount } = require('process')
const fs = require('fs')
const url = require('url')

fs.writeFileSync('./text.txt', "New File Created\n")

const myServer = http.createServer((req, res) => {
    // console.log(req.headers)
    // if(req.url !== "/favicon.ico")  // To aviod the double visit
    // {
    //     fs.appendFile('./07_Building_HTTP_Server/text.txt', "New Request Added!\n", (err, data) => {
    //     res.end("Hello from server!")
    // })
    // }
    const content = `New Request Added!, Time: ${new Date().toLocaleString()}, ${req.url} \n`;
    const myUrl = url.parse(req.url, true) // This true allows to create a object and seprate all the query parameters to that query
    // Ex path = path: '/about?myname=swapnil&id=43178&year=4',
    // In myUrl there is property query = query: [Object: null prototype] {
    //     myname: 'swapnil',
    //     id: '43178',
    //     year: '4'
    //   },
    console.log(myUrl)
    fs.appendFile('./text.txt', content, (err, data) => {
        if(myUrl.pathname === '/')
        {
            res.end("Welcome to Home!")
        }
        else if(myUrl.pathname === '/about')
        {
            res.end(`Hey, ${myUrl.query.myname}`)
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