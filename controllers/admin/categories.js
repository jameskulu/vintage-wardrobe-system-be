const { Category } = require('../../models')
const { createValidation } = require('../../validation/admin/categories')

exports.all = async (req, res, next) => {
    try {
        const category = await Category.findAll({
            order: [['createdAt', 'DESC']],
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
        const singleCategory = await Category.findByPk(categoryId)

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

exports.create = async (req, res, next) => {
    const { name } = req.body

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const createdCategory = await Category.create({
            name,
        })
        return res.status(200).json({
            success: true,
            message: 'New category was added.',
            data: createdCategory,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { categoryId } = req.params
    const { name } = req.body

    try {
        const category = await Category.findByPk(categoryId)

        if (!category)
            return res.status(404).json({
                success: false,
                message: 'Category not found!',
            })

        await category.update({ name })
        return res.status(200).json({
            success: true,
            message: 'Category was updated.',
            data: category,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { categoryId } = req.params

    try {
        const singleCategory = await Category.findByPk(categoryId)

        if (!singleCategory)
            return res.status(404).json({
                success: false,
                message: 'Category not found!',
            })

        const deletedCategory = await Category.destroy({
            where: { id: categoryId },
        })

        return res.status(200).json({
            success: true,
            message: 'Category was deleted.',
            data: deletedCategory,
        })
    } catch (err) {
        return next(err)
    }
}
