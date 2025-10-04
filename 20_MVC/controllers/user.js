const User = require('../models/user')

async function getAllUsers(req, res)
{
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
}

async function getUserById(req, res)
{
    const id = req.params.id;
    const user = await User.findById(id)
    if (!user)
    {
        return res.status(404).json({ status: "Error", message: "User not found" });
    }
    return res.json(user)
}

async function addNewUser(req, res)
{
    const body = req.body
    if(!body.first_name || !body.email || !body.gender || !body.job_title)
    {
        return res.status(400).json({message: "All fields are required"})
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    console.log("result: ", result)
    return res.status(201).json({ message: "User created", user: result })
}

async function updateUser(req, res)
{
    const id = req.params.id;
    const body = req.body
    try {
        const user = await User.findByIdAndUpdate(id, body, { new: true });
        if (!user)
        {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
        return res.json({ status: "Success", id: id, email: user.email });
    }
    catch (err)
    {
        return res.status(500).json({ status: "Error", message: err.message });
    }
}

async function deleteUser(req, res)
{
    const id = req.params.id
    try{
        const user = await User.findByIdAndDelete(id)
        if (!user)
        {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
        return res.json({ status: "Success", id: id, name: user.firstName });
    }
    catch (err)
    {
        return res.status(500).json({ status: "Error", message: err.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser
}