const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')

const { all, single, create, search } = require('../controllers/items')

router.get('/s', search)

router.get('/', all)

router.get('/:itemId', single)

module.exports = router
