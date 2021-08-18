const {
    User,
    Order,
    Item,
    SubCategory,
    ItemReview,
    ItemImage,
} = require('../models')
const {
    createValidation,
    orderStatusValidation,
} = require('../validation/renters')
const cloudinary = require('../utils/cloudinary')

exports.getUploadedItems = async (req, res, next) => {
    const userId = req.user.id
    try {
        const items = await Item.findAll({
            where: { userId },
            include: [
                {
                    model: User,
                    as: 'user',
                },
                {
                    model: SubCategory,
                    as: 'subCategory',
                },
                {
                    model: ItemImage,
                    as: 'images',
                },
            ],
        })
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

exports.create = async (req, res, next) => {
    const { name, description, price, size, color, subCategoryId } = req.body
    const userId = req.user.id
    let result = null

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const subCategory = await SubCategory.findByPk(subCategoryId)
        if (!subCategory)
            return res.status(400).json({
                success: false,
                message: 'Sub Category not found',
            })

        const createdItem = await Item.create(
            {
                name,
                description,
                price,
                size,
                color,
                subCategoryId,
                userId,
            }
            // {
            //     include: [
            //         {
            //             model: User,
            //             as: 'user',
            //         },
            //     ],
            // }
        )

        // if (result !== null) {
        //     try {
        //         await cloudinary.uploader.destroy(user.cloudinaryId)
        //     } catch (err) {
        //         //
        //     }
        // }

        if (req.files) {
            console.log(req.files)
            req.files.map(async (file) => {
                result = await cloudinary.uploader.upload(file.path)
                await ItemImage.create({
                    imageURL: result.secure_url,
                    cloudinaryId: result.public_id,
                    itemId: createdItem.id,
                })
            })
        }

        return res.status(200).json({
            success: true,
            message: 'New item was added.',
            data: createdItem,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { itemId } = req.params
    const userId = req.user.id
    const { name, description, price, size, color } = req.body

    try {
        const singleItem = await Item.findByPk(itemId)

        if (!singleItem)
            return res.status(404).json({
                success: false,
                message: 'Item not found!',
            })

        if (singleItem.userId !== userId)
            return res.status(400).json({
                success: false,
                message:
                    'Access denied ! Only creator of this item can update.',
            })

        const updatedItem = await Item.update(
            { name, description, price, size, color },
            { where: { id: itemId } }
        )
        return res.status(200).json({
            success: true,
            message: 'Item was updated.',
            data: updatedItem,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { itemId } = req.params
    const userId = req.user.id

    try {
        const singleItem = await Item.findByPk(itemId)

        if (!singleItem)
            return res.status(404).json({
                success: false,
                message: 'Item not found!',
            })

        if (singleItem.userId !== userId)
            return res.status(400).json({
                success: false,
                message:
                    'Access denied ! Only creator of this item can delete.',
            })

        const deletedItem = await Item.destroy({
            where: { id: itemId },
        })
        return res.status(200).json({
            success: true,
            message: 'Item was deleted.',
            data: deletedItem,
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
                    required: true,
                },
                {
                    model: Item,
                    as: 'item',
                    required: true,
                    include: [
                        {
                            model: User,
                            as: 'user',
                            where: {
                                id: userId,
                            },
                        },
                        {
                            model: SubCategory,
                            as: 'subCategory',
                        },
                        {
                            model: ItemImage,
                            as: 'images',
                        },
                    ],
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
                {
                    model: User,
                    as: 'user',
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

            // Item reviewed
            const itemReview = await ItemReview.findOne({
                where: { itemId: order.item.id, userId },
            })

            if (!itemReview) {
                await ItemReview.create({
                    userId: order.user.id,
                    isReviewed: false,
                    itemId: order.item.id,
                })
            }
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
