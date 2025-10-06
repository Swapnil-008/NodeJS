const mongoose = require('mongoose')

async function connectionDB(url) 
{
    return await mongoose.connect(url)
}

module.exports = connectionDB