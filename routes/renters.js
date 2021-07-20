const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')
const {
    getUploadedItems,
    create,
    getOrders,
    changeOrderStatus,
} = require('../controllers/renters')

// get all uploaded items
router.get('/items', verifyToken, getUploadedItems)

// upload item
router.post('/items/new', verifyToken, create)

// get all booked items from others
router.get('/orders', verifyToken, getOrders)

// change order status
router.post('/orders/:orderId/status', verifyToken, changeOrderStatus)

module.exports = router
