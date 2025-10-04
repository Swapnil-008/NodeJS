const express = require('express')
const { generateNewShortURL, updateURLVisitHistory, getAnalytics } = require('../controllers/url.js')
const router = express.Router()

router.post('/', generateNewShortURL)

router.get('/:shortId',updateURLVisitHistory)

router.get('/analytics/:shortId', getAnalytics)

module.exports = router