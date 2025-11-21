const express = require('express')
const fs = require('fs')
const url = require('url')

const app = express();
const PORT = 8000

app.get('/', (req, res) => {
    const myUrl = url.parse(req.url, true)
    if(myUrl.pathname === '/favicon.ico')
    {
        return;
    }
    console.log(myUrl.pathname)
    fs.appendFileSync('./text.txt', `New Request Added, Time: ${new Date().toDateString()}, ${myUrl.pathname} \n`)
    return res.send("Hello From Home Page!")
})

app.get('/about', (req, res) => {
    const myUrl = url.parse(req.url, true)
    if(myUrl.pathname === '/favicon.ico')
    {
        return;
    }
    console.log(myUrl.pathname)
    fs.appendFileSync('./text.txt', `New Request Added, Time: ${new Date().toDateString()}, ${myUrl.pathname}`)
    return res.send(`Hello ${req.query.username},`)
})

app.listen(PORT, () => console.log("Server Started!"))