const router = require('express').Router()
const { verifyToken, isAdmin } = require('../../middleware/authentication')

const {
    all,
    single,
    create,
    update,
    remove,
} = require('../../controllers/admin/items')
const upload = require('../../utils/multer')

router.get('/', verifyToken, isAdmin, all)

router.get('/:itemId', verifyToken, isAdmin, single)

router.post('/new', verifyToken, isAdmin, upload.array('images', 3), create)

router.put(
    '/update/:itemId',
    verifyToken,
    isAdmin,
    upload.array('images', 3),
    update
)

router.delete('/delete/:itemId', verifyToken, isAdmin, remove)

module.exports = router
