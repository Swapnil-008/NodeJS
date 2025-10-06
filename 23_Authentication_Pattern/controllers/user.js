const User = require('../models/user')
const {v4: uuidv4} = require('uuid')
const {setUser} = require('../service/auth')

async function createUserSignup(req, res)
{
    const {name, email, password} = req.body;
    const newUser = await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/")
}

async function userLogin(req, res)
{
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user)
    {
        return res.status(400).render('login', {
            error: 'Invalid username or password'
        });
    }
    //StateFull
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);

    //StateLess
    const token = setUser({
        _id: user._id,
        email: user.email
        });
    res.cookie("uid", token, {httpOnly: true});
    return res.redirect("/");
}

module.exports = {
    createUserSignup,
    userLogin
}