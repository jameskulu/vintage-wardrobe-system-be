const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')

const { all, single } = require('../controllers/items')

router.get('/', all)

router.get('/:itemId', single)

module.exports = router
