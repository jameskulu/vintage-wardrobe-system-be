const router = require('express').Router()
const { verifyToken, isUserVerified } = require('../middleware/authentication')
const {
    register,
    activateAccount,
    login,
    resetPassword,
    updatePasswordByToken,
    validToken,
    loggedInUser,
} = require('../controllers/users')

// User registration
router.post('/register', register)

// Email activation
router.post('/email-activate', activateAccount)

// User login
router.post('/login', isUserVerified, login)

// Forgot password
router.post('/reset-password', resetPassword)

// Change password from forgot password
router.post('/new-password', updatePasswordByToken)

// Verify Token
router.post('/tokenIsValid', validToken)

// get logged in user
router.get('/', verifyToken, loggedInUser)

module.exports = router
