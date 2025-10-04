const express = require('express')
const { connectMongoDb } = require('./connection.js')
const { logReqRes } = require('./middlewares/index')
const userRouter = require('./routes/user')

const app = express();
const PORT = 8000

//Connection
connectMongoDb('mongodb://127.0.0.1:27017/employee1')
.then(() => {
    console.log("MongoDB connected!")
})
.catch((err) => {
    console.log("Error while connecting the Database: ", err)
})

//Middleware - Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('./log.txt'))

//Routes
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log("Server Started!"))