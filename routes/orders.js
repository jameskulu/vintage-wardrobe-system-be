const router = require('express').Router()
const { create } = require('../controllers/orders')
const { verifyToken } = require('../middleware/authentication')

// New order
router.post('/new', verifyToken, create)

module.exports = router
