const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true
        },
        redirectedURL: {
            type: String,
            required: true
        },
        visitHistory: [{ timestamp: { type: String}}]  //Array of objects (object contains timestamp)
    },
    {
        timestamps: true
    }
)

const URL = mongoose.model('url', urlSchema);

module.exports = URL