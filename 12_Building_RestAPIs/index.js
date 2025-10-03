const express = require('express')
let users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = express()
const PORT = 8000

//Middleware - Plugin

app.use(express.urlencoded({extended: false}));

//Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li> ${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html)
})

//Rest API

//Get all the users
app.get('/api/users', (req, res) => {
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
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(newUsers), (err) => {
        if (err)
        {
            return res.status(500).json({ status: "Error", message: err })
        }
        users = newUsers;
        return res.json({ status: "Success", id: id })
    })
})

//Delete user
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body
    // const newUsers = users.map((user) => {   //But it lefts null at the place of removed user
    //     if(user.id !== id)
    //     {
    //         return user;
    //     }
    // })
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

app.listen(PORT, () => console.log("Server Started!"))