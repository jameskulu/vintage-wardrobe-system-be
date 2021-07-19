const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')
const {
    getUploadedItems,
    getOrders,
    changeOrderStatus,
} = require('../controllers/renters')

// get all uploaded items
router.get('/items', verifyToken, getUploadedItems)

// get all booked items from others
router.get('/orders', verifyToken, getOrders)

// change order status
router.post('/orders/:orderId/status', verifyToken, changeOrderStatus)

module.exports = router
