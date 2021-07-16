const { Item, User, SubCategory } = require('../models')
const { createValidation } = require('../validation/items')

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
    const { name, description, price, subCategoryId } = req.body
    const userId = req.user.id

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
        return res.status(200).json({
            success: true,
            message: 'New item was added.',
            data: createdItem,
        })
    } catch (err) {
        return next(err)
    }
}
