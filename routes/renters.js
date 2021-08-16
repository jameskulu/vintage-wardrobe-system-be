const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')
const {
    getUploadedItems,
    create,
    update,
    remove,
    getOrders,
    changeOrderStatus,
} = require('../controllers/renters')
const upload = require('../utils/multer')

// get all uploaded items
router.get('/items', verifyToken, getUploadedItems)

// upload item
router.post('/items/new', verifyToken, upload.array('images', 5), create)

// edit item
router.put('/items/update/:itemId', verifyToken, update)

// remove item
router.delete('/items/delete/:itemId', verifyToken, remove)

// get all booked items from others
router.get('/orders', verifyToken, getOrders)

// change order status
router.post('/orders/:orderId/status', verifyToken, changeOrderStatus)

module.exports = router
