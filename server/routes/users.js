const router = require('express').Router()
const { register, activateAccount } = require('../controllers/users')

// User registration
router.post('/register', register)

// Email activation
router.post('/email-activate', activateAccount)

module.exports = router
