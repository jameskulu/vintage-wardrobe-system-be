const router = require('express').Router()
const { all, single, itemsByCategory } = require('../controllers/categories')

router.get('/', all)

router.get('/:categoryId', single)

router.get('/:category', itemsByCategory)

module.exports = router
