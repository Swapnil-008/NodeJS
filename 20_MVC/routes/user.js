const express = require('express')
const { getAllUsers, getUserById, addNewUser, updateUser, deleteUser } = require('../controllers/user')
const router = express.Router();

//Get all the users
router.get('/', getAllUsers)

//Get the user with specific ID
router.get('/:id', getUserById)

//Create new user
router.post('/', addNewUser)

// Update the existing user
router.patch('/:id', updateUser)

//Delete user
router.delete('/:id', deleteUser)

module.exports = router;