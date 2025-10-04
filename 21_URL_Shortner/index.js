const express = require('express')
const connectionDB = require('./connection')
const urlRoute = require('./routes/url.js')

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

//Routes
app.use('/url', urlRoute)

app.listen(PORT, () => console.log(`Server started at ${PORT}`))