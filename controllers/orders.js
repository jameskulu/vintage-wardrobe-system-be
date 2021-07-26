const { Order, Item } = require('../models')
const { createValidation } = require('../validation/orders')

exports.create = async (req, res, next) => {
    const { items } = req.body
    const userId = req.user.id

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const newItems = items.map((v) => ({ ...v, userId }))

        // set isAvailable to false after ordering that item
        newItems.map(async (item) => {
            await Item.update(
                { isAvailable: false },
                { where: { id: item.itemId } }
            )
        })

        const createdOrder = await Order.bulkCreate(newItems)

        return res.status(200).json({
            success: true,
            message: 'Item(s) ordered',
            data: createdOrder,
        })
    } catch (err) {
        return next(err)
    }
}
