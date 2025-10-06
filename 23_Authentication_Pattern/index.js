const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const connectionDB = require('./connection')
const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth.js')

const urlRoute = require('./routes/url.js')
const staticRoute = require('./routes/staticRouter.js')
const userRoute = require('./routes/user.js')

const app = express()
const PORT = 8000

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
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
app.use('/url', restrictToLoggedinUserOnly, urlRoute)

//static routes
app.use('/', checkAuth, staticRoute)

//User routes
app.use('/user', userRoute)

app.listen(PORT, () => console.log(`Server started at ${PORT}`))