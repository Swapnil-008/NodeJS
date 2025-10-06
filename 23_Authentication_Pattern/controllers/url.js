const { default: mongoose } = require('mongoose');
const URL = require('../models/url')
const shortid = require('shortid')

async function generateNewShortURL(req, res)
{
    const body = req.body
    if(!body.url)
    {
        return res.status(400).json({error: "URL is required"})
    }
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectedURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    const allURLs = await URL.find({createdBy: req.user._id});
    return res.render("home", {
        id:shortID,
        urls: allURLs,
    })
}

async function updateURLVisitHistory(req, res)
{
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId: shortID },
        {
            $push: {
                visitHistory: {
                    timestamp: new Date().toLocaleString()
                },
            }
        },
        { new: true }
    );
    if (!entry)
    {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectedURL);
}
async function getAnalytics(req, res)
{
    const shortID = req.params.shortId
    const result = await URL.findOne({shortId: shortID})
    return res.json(
        {
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        }
    )
}

module.exports = {
    generateNewShortURL,
    updateURLVisitHistory,
    getAnalytics
}