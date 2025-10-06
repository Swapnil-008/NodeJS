const {getUser} = require('../service/auth')

async function restrictToLoggedinUserOnly(req, res, next)
{
    const userUid = req.cookies?.uid;
    if(!userUid)
    {
        return res.status(400).render('login', {error: "No uid for this user!"});
    }
    const user = getUser(userUid);
    if(!user)
    {
        return res.status(400).redirect('login');
    }
    req.user = user;
    next();
}

async function checkAuth(req, res, next)
{
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly, 
    checkAuth
}