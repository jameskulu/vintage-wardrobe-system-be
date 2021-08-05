const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')
const {
    getReview,
    addReview,
    getItemReview,
} = require('../controllers/reviews')

router.get('/reviewed', verifyToken, getItemReview)

// get all reviews of an item
router.get('/:itemId', verifyToken, getReview)

// upload item
router.post('/new', verifyToken, addReview)

module.exports = router
