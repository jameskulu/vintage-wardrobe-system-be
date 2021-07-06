const router = require('express').Router()
const { isUserVerified } = require('../middleware/authentication')
const { register, activateAccount, login } = require('../controllers/users')

// User registration
router.post('/register', register)

// Email activation
router.post('/email-activate', activateAccount)

// User login
router.post('/login', isUserVerified, login)

module.exports = router
