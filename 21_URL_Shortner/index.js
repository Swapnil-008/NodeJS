const express = require('express')
const path = require('path')
const URL = require('./models/url.js')
const connectionDB = require('./connection')
const urlRoute = require('./routes/url.js')
const staticRoute = require('./routes/staticRouter.js')

const app = express()
const PORT = 8000

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Connectivity
connectionDB('mongodb://127.0.0.1:27017/short-url')
.then(() => {
    console.log("MongoDB connected!")
})
.catch((err) => {
    console.log(`Error while connecting the DB: ${err}`)
})

//Using the EJS view engine
app.set("view engine", "ejs")
//Defining the path of EJS
app.set('views', path.resolve('./views'))

//Routes
app.use('/url', urlRoute)

// Routes which use EJS
app.use('/', staticRoute)

app.listen(PORT, () => console.log(`Server started at ${PORT}`))