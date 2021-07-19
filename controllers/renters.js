const { User, Order, Item } = require('../models')
const { orderStatusValidation } = require('../validation/renters')

exports.getUploadedItems = async (req, res, next) => {
    const userId = req.user.id
    try {
        const items = await Item.findAll({ where: { userId } })
        return res.status(200).json({
            success: true,
            message: 'All the uploaded items are fetched.',
            count: items.length,
            data: items,
        })
    } catch (err) {
        return next(err)
    }
}

exports.getOrders = async (req, res, next) => {
    const userId = req.user.id
    try {
        const orderedItems = await Order.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    where: {
                        id: userId,
                    },
                },
                {
                    model: Item,
                    as: 'item',
                },
            ],
        })
        return res.status(200).json({
            success: true,
            message: 'All the ordered items are fetched.',
            count: orderedItems.length,
            data: orderedItems,
        })
    } catch (err) {
        return next(err)
    }
}

exports.changeOrderStatus = async (req, res, next) => {
    const { orderId } = req.params
    const { status } = req.body
    const userId = req.user.id

    // Validation
    const { error } = orderStatusValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: Item,
                    as: 'item',
                },
            ],
        })

        if (!order)
            return res
                .status(404)
                .json({ success: false, message: 'Order not found' })

        if (order.item.userId !== userId)
            return res.status(401).json({
                success: false,
                message: 'Access denied !',
            })

        if (status === 'approved') {
            await order.update({ status })
            await Item.update(
                { isAvailable: false },
                { where: { id: order.item.id } }
            )
        } else if (status === 'refused') {
            await order.update({ status })
            await Item.update(
                { isAvailable: true },
                { where: { id: order.item.id } }
            )
        } else if (status === 'delivered') {
            await order.update({ status })
            await Item.update(
                { isAvailable: false },
                { where: { id: order.item.id } }
            )
        } else if (status === 'received') {
            await order.update({ status })
            await Item.update(
                { isAvailable: true },
                { where: { id: order.item.id } }
            )
        }

        return res.status(200).json({
            success: true,
            message: `Order ${status}.`,
            data: order,
        })
    } catch (err) {
        return next(err)
    }
}
