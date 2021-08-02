const { Category, SubCategory } = require('../models')

exports.all = async (req, res, next) => {
    try {
        const category = await Category.findAll()
        return res.status(200).json({
            success: true,
            message: 'All the available categories are fetched.',
            count: category.length,
            data: category,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { categoryId } = req.params

    try {
        const singleCategory = await Category.findByPk(categoryId, {
            include: [
                {
                    model: SubCategory,
                    as: 'category',
                },
            ],
        })

        if (!singleCategory)
            return res.status(404).json({
                success: false,
                message: 'Category not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single category is fetched.',
            data: singleCategory,
        })
    } catch (err) {
        return next(err)
    }
}

exports.itemsByCategory = async (req, res, next) => {
    const { category } = req.params

    try {
        const items = await Item.findAll({
            include: [
                {
                    model: SubCategory,
                    as: 'subCategory',
                    required: true,
                    include: [
                        {
                            model: Category,
                            as: 'category',
                            where: { name: category },
                        },
                    ],
                },
            ],
        })

        return res.status(200).json({
            success: true,
            message: `items of ${category} category is fetched.`,
            data: items,
        })
    } catch (err) {
        return next(err)
    }
}
