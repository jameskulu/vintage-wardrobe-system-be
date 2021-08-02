const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')
const { getReview, addReview } = require('../controllers/reviews')

// get all reviews of an item
router.get('/:itemId', verifyToken, getReview)

// upload item
router.post('/new', verifyToken, addReview)

module.exports = router
