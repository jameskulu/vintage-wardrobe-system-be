const { Item, User, Review, ItemReview } = require('../models')
const { addReviewValidation } = require('../validation/items')

exports.getReview = async (req, res, next) => {
    const { itemId } = req.params
    try {
        const reviews = await Review.findAll(
            { where: { itemId } },
            {
                include: [
                    {
                        model: User,
                        as: 'user',
                    },
                    {
                        model: Item,
                        as: 'item',
                    },
                ],
            }
        )
        return res.status(200).json({
            success: true,
            message: 'All the available reviews are fetched.',
            count: reviews.length,
            data: reviews,
        })
    } catch (err) {
        return next(err)
    }
}

exports.addReview = async (req, res, next) => {
    const { text, rating, itemId } = req.body
    const userId = req.user.id

    // Validation
    const { error } = addReviewValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const itemReview = await ItemReview.findOne({
            where: { itemId, userId, isReviewed: false },
        })

        if (!itemReview) {
            return res.status(404).json({
                success: false,
                message: 'You cannot review on this item!',
            })
        }

        const createdReview = await Review.create({
            text,
            rating,
            itemId,
            userId,
        })

        await ItemReview.update(
            { isReviewed: true },
            { where: { itemId, userId } }
        )

        return res.status(200).json({
            success: true,
            message: 'New review was added.',
            data: createdReview,
        })
    } catch (err) {
        return next(err)
    }
}
