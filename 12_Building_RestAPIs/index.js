const express = require('express')
const users = require('./MOCK_DATA.json')
const app = express()
const PORT = 8000

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
    return res.json(user)
})

//Create new user
app.post('/api/users', (req, res) => {
    return res.json({status: "pending"})
})

//Update the existing user
app.patch('/api/users/:id', (req, res) => {
    return res.json({status: "pending"})
})

//Delete user
app.delete('/api/users/:id', (req, res) => {
    return res.json({status: "pending"})
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