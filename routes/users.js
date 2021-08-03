const router = require('express').Router()
const { verifyToken, isUserVerified } = require('../middleware/authentication')
const {
    register,
    activateAccount,
    login,
    forgotPassword,
    resetPassword,
    validToken,
    loggedInUser,
    getOrders,
    cancelOrder,
    getWishlist,
    addWishlist,
    removeWishlist,
} = require('../controllers/users')

// User registration
router.post('/register', register)

// Email activation
router.post('/email-activate', activateAccount)

// User login
router.post('/login', isUserVerified, login)

// Forgot password
router.post('/forgot-password', forgotPassword)

// Change password from forgot password
router.post('/reset-password', resetPassword)

// Verify Token
router.post('/tokenIsValid', validToken)

// get logged in user
router.get('/', verifyToken, loggedInUser)

// get all booked item of loggedIn user
router.get('/orders', verifyToken, getOrders)

// Cancel order
router.delete('/orders/:orderId/cancel', verifyToken, cancelOrder)

// add to wishlist
router.get('/wishlist', verifyToken, getWishlist)

// add to wishlist
router.post('/wishlist/add', verifyToken, addWishlist)

// remove from wishlist
router.delete('/wishlist/remove/:itemId', verifyToken, removeWishlist)

module.exports = router
