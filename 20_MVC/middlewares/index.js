const fs = require('fs')

function logReqRes(filePath) {
    return ((req, res, next) => {
        const data = `${new Date().toLocaleString()}: ${req.method}: ${req.url}\n`
        fs.appendFile(filePath, data, (err) => {
            next();
        })
    })
}

module.exports = {
    logReqRes,
}