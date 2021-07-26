const { Category, SubCategory } = require('../models')

exports.all = async (req, res, next) => {
    try {
        const category = await Category.findAll({
            include: [
                {
                    model: SubCategory,
                    as: 'subCategory',
                },
            ],
        })
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
                    as: 'subCategory',
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