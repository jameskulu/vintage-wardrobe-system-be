const { Item, User, ItemImage, SubCategory } = require('../../models')
const { createValidation } = require('../../validation/admin/items')
const cloudinary = require('../../utils/cloudinary')

exports.all = async (req, res, next) => {
    try {
        const items = await Item.findAll({
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
            message: 'All the available items are fetched.',
            count: items.length,
            data: items,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { itemId } = req.params

    try {
        const singleItem = await Item.findByPk(itemId, {
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

        if (!singleItem)
            return res.status(404).json({
                success: false,
                message: 'Item not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single item is fetched.',
            data: singleItem,
        })
    } catch (err) {
        return next(err)
    }
}

exports.create = async (req, res, next) => {
    const { name, description, price, color, size, subCategoryId, userId } =
        req.body
    let result = null

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const createdService = await Item.create(
            {
                name,
                description,
                price,
                userId,
                color,
                size,
                subCategoryId,
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

        if (req.files) {
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
            data: createdService,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { itemId } = req.params
    const { name, description, price, color, size, subCategoryId, userId } =
        req.body

    try {
        const singleItem = await Item.findByPk(itemId)

        if (!singleItem)
            return res.status(404).json({
                success: false,
                message: 'Item not found!',
            })

        const updatedItem = await Item.update(
            { name, description, price, color, size, subCategoryId, userId },
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

    try {
        const singleItem = await Item.findByPk(itemId)

        if (!singleItem)
            return res.status(404).json({
                success: false,
                message: 'Item not found!',
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
