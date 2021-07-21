const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')
const { all, single } = require('../controllers/subCategories')

router.get('/', verifyToken, all)

router.get('/:subCategoryId', single)

module.exports = router
