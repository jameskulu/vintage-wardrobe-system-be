const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')

const { all, single, create } = require('../controllers/items')

router.get('/', all)

router.get('/:itemId', single)

router.post('/new', verifyToken, create)

module.exports = router
