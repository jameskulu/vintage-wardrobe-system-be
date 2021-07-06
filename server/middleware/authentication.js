const jwt = require('jsonwebtoken')
const { User } = require('../models')

exports.isUserVerified = async (req, res, next) => {
    if (!req.body.email) return next()
    try {
        const user = await User.findOne({
            where: { email: req.body.email },
        })
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials',
            })
        if (user.isVerified) return next()
        return res.status(400).json({
            success: false,
            message:
                'Your account has not been verified. Please check your email to verify your account.',
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}
