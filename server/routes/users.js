const router = require('express').Router()
const { register } = require('../controllers/users')

// User registration
router.post('/register', register)

module.exports = router
