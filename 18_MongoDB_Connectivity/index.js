const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')

const app = express()
const PORT = 8000

//Connection
mongoose.connect('mongodb://127.0.0.1:27017/employee1')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Error while connecting database: ", err));

//Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName:{
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        jobTitle: {
            type: String,
        },
        gender: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema)
//Middleware - Plugin
app.use(express.json());
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
    fs.appendFile('./log.txt', data, (err) => {                          
        next();
    })
})

//Rest API
//Get all the users
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
})

//Get the user with specific ID
app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id)
    if (!user)
    {
        return res.status(404).json({ status: "Error", message: "User not found" });
    }
    return res.json(user)
})

//Create new user
app.post('/api/users', async (req, res) => {
    const body = req.body
    if(!body.first_name || !body.email || !body.gender || !body.job_title)
    {
        return res.status(400).json({message: "All fields are required"})
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    console.log("result: ", result)
    return res.status(201).json({ message: "User created", user: result })
})

// Update the existing user
app.patch('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body
    try {
        const user = await User.findByIdAndUpdate(id, body, { new: true });
        if (!user)
        {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
        return res.json({ status: "Success", id: id, email: user.email });
    }
    catch (err)
    {
        return res.status(500).json({ status: "Error", message: err.message });
    }
})

//Delete user
app.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id
    try{
        const user = await User.findByIdAndDelete(id)
        if (!user)
        {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
        return res.json({ status: "Success", id: id, name: user.firstName });
    }
    catch (err)
    {
        return res.status(500).json({ status: "Error", message: err.message });
    }
})

app.listen(PORT, () => console.log("Server Started!"))