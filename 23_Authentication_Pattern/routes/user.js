const express = require('express');
const {createUserSignup, userLogin} = require('../controllers/user')
const router = express.Router();

router.post('/', createUserSignup)

router.post('/login', userLogin)

module.exports = router