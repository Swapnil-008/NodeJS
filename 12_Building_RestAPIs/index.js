const express = require('express')
let users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false})); //Used to parse the form data

app.get('/api/users', (req, res) => {
    return res.json(users)
})

//Get the user with specific ID
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);    //params.id -> string
    const user = users.find((user) => user.id === id);
    if(user === undefined)
    {
        return res.status(404).json({status: "User not found"})
    }
    return res.status(200).json(user);
})

//Create new user
app.post('/api/users', (req, res) => {
    const body = req.body
    console.log("Body: ", body.first_name)
    users.push({...body, id: users.length + 1})
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if(err)
        {
            return res.status(400).json({status: "failed"})
        }
        return res.status(201).json({status: "Success", id: users.length})
    })
})

// Update the email of existing user
app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const newEmail = req.body.email;
    const user = users.find((user) => user.id === id)
    if(user === undefined)
    {
        return res.status(404).json({status: "failed", message: "No User found"})
    }
    user.email = newEmail
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if(err)
        {
            return res.status(500).json({status: "Failed"})
        }
        return res.status(200).json({status: "Success", id: id})
    })
})

//Delete user
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    // const newUsers = users.map((user) => {   //But it lefts null at the place of removed user
    //     if(user.id !== id)
    //     {
    //         return user;
    //     }
    // })
    const newUsers = users.filter((user) => user && user.id !== id)
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(newUsers), (err) => {
        if(err)
        {
            return res.status(404).json({message: "User not found"})
        }
        users = newUsers
        return res.status(200).json({status: "Succes", message: "Successfully user deleted!"})
    })
})

//If we observe the above routes then we can see that get, patch, and delete route have same path, so as they have the same path we could group the routes
// app
// .route('/api/users/:id')
// .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user)
// })
// .patch((req, res) => {
//     return res.json({status: "pending"})
// })
// .delete((req, res) => {
//     return res.json({status: "pending"})
// })

app.listen(PORT, ()=>{
    console.log("Server started!")
})