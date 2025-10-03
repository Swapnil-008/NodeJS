const express = require('express')

const app = express();
const PORT = 8000

app.get('/', (req, res) => {
    return res.send("Hello From Home Page!")
})

app.get('/about', (req, res) => {
    return res.send("Hello From About Page!")
})

app.listen(PORT, () => console.log("Server Started!"))