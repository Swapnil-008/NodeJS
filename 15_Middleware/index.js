const express = require('express')
let users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = express()
const PORT = 8000

//Middleware - Plugin
app.use(express.urlencoded({extended: false}));  //Parse the form data and pass the request forward (internally req.body = sent Data (like below used myUserName)

app.use((req, res, next) => {
    console.log("Hello from middleware 1")
    // return res.end("Hey")                        //If we directly return without calling the next then it will not allow to execute the below code
    req.myUserName = "Swapnil.dev"    //We have created a new property which would be accessible in below middlewares as well as routes also.
    next();          //Denotes hadling the execution to the forward widdleware or routes
})

app.use((req, res, next) => {
    console.log("Hello from middleware 2 ", req.myUserName)
    // return res.end("Hey")    
    next();         
})

//Middleware created for maintaing the log of requests, before moving forward it execution
app.use((req, res, next) => {
    const data = `${new Date().toLocaleString()}: ${req.method}: ${req.url}\n`
    fs.appendFile('./log.txt', data, (err, data) => {                          
        next()
    })
})

//Rest API
//Get all the users
app.get('/api/users', (req, res) => {
    //Custom Header  //Always append X to custom header
    res.setHeader('X-MyName', "Swapnil Shingne")  //It will add our own defined header to the response
    console.log("Get all users ", req.myUserName)
    return res.json(users)
})

//Get the user with specific ID
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(user === undefined)
    {
        return res.json({status: "Not found"})
    }
    return res.json(user)
})

//Create new user
app.post('/api/users', (req, res) => {
    const body = req.body
    console.log("Body: ", body.first_name)
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: "Success", id: users.length})
    })
})

// Update the email of existing user
app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body
    const user = users.find((user) => user.id === id)
    user.email = body.email
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err)
        {
            return res.status(500).json({ status: "Error", message: err })
        }
        return res.json({ status: "Success", id: id })
    })
})

//Delete user
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body
    const newUsers = users.filter((user) => user && user.id !== id)
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(newUsers), (err) => {
        if (err)
        {
            return res.status(500).json({ status: "Error", message: err })
        }
        users = newUsers;
        return res.json({ status: "Success", id: id })
    })
})

app.listen(PORT, () => console.log("Server Started!"))