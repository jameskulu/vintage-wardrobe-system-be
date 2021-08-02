const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { User, Order, Item, Wishlist } = require('../models')
const {
    registerValidation,
    activateAccountValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    addWishlistValidation,
} = require('../validation/users')
const { sendEmail } = require('../config/mail')

exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body

    // Validation
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    try {
        // Checking if email exists
        const emailExists = await User.findOne({ where: { email } })

        if (emailExists)
            return res.status(400).json({
                success: false,
                message: 'Email was already taken.',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating a new user
        const registeredUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false,
        })

        const subject = 'Account Activation Link'
        const html = `
            <h2>Confirm your Email Address</h2>
            <p>Hi, Thank you for signing up. Please click below to confirm your email address.</p>
            <a href="${process.env.CLIENT_URL}/verify-email/${registeredUser.emailToken}">
                <button>I Confirm</button>
            </a>
            `

        // Sending verification email
        sendEmail(registeredUser.email, subject, html)

        return res.status(200).json({
            success: true,
            message:
                'Account was created successfully. Email has been sent, please activate your account.',
            data: registeredUser,
        })
    } catch (err) {
        return next(err)
    }
}

exports.activateAccount = async (req, res, next) => {
    const { token } = req.body

    // Validation
    const { error } = activateAccountValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({ where: { emailToken: token } })

        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Token is invalid.',
            })

        await User.update(
            { emailToken: null, isVerified: true },
            { where: { id: user.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'Account is verified.',
            data: user,
        })
    } catch (err) {
        return next(err)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    // Validation
    const { error } = loginValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        // Checking if user with that email exists
        const user = await User.findOne({ where: { email } })
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        // Checking if password matches
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        }

        // Assigning a token
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)

        return res.status(200).json({
            success: true,
            message: 'You are now logged in.',
            token,
            data: payload,
        })
    } catch (err) {
        return next(err)
    }
}

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body
    const token = crypto.randomBytes(64).toString('hex')

    // Validation
    const { error } = forgotPasswordValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({ where: { email } })
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User with that email does not exist.',
            })

        await user.update({
            resetToken: token,
            expireToken: Date.now() + 3600000,
        })

        const subject = 'Password Reset'
        const html = `
            <h2>Reset your password</h2>
            <p>Please click on given link to reset your password.</p>
            <a href="${process.env.CLIENT_URL}/reset-password/${token}">
                <button>Reset</button>
            </a>
            `

        // Sending forgot password email
        sendEmail(user.email, subject, html)

        return res.status(200).json({
            success: true,
            message: 'Email has been sent, please reset your password.',
            data: user,
        })
    } catch (err) {
        return next(err)
    }
}

exports.resetPassword = async (req, res, next) => {
    const { newPassword, token } = req.body

    // Validation
    const { error } = resetPasswordValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({
            where: { resetToken: token, expireToken: { [Op.gt]: Date.now() } },
        })

        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Session expired',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        await user.update({
            password: hashedPassword,
            resetToken: null,
            expireToken: null,
        })

        return res.status(200).json({
            success: true,
            message: 'New password was updated.',
            data: user,
        })
    } catch (err) {
        return next(err)
    }
}

exports.validToken = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json(false)
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.json(false)

        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if (!verified) return res.json(false)

        const user = await User.findByPk(verified.id)
        if (!user) return res.json(false)

        return res.json(true)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

exports.loggedInUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        user.password = undefined
        user.resetToken = undefined
        user.emailToken = undefined
        return res.json(user)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

exports.getOrders = async (req, res, next) => {
    const userId = req.user.id
    try {
        const orderedItems = await Order.findAll(
            {
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
            },
            { where: { userId } }
        )
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

exports.cancelOrder = async (req, res, next) => {
    const { orderId } = req.params
    try {
        const orderedItem = await Order.findByPk(orderId, {
            include: [
                {
                    model: Item,
                    as: 'item',
                },
            ],
        })
        if (!orderedItem) {
            return res.status(400).json({
                success: false,
                message: 'Order not found',
            })
        }

        if (orderedItem.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Only pending orders can be canceled',
            })
        }

        const cancelOrder = await Order.destroy({
            where: { id: orderedItem.id },
        })

        await Item.update(
            { isAvailable: true },
            { where: { id: orderedItem.item.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'Order canceled.',
            data: cancelOrder,
        })
    } catch (err) {
        return next(err)
    }
}

exports.getWishlist = async (req, res, next) => {
    const userId = req.user.id
    try {
        const wishlist = await Wishlist.findAll(
            { where: { userId } },
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
            message: 'All the available wishlist are fetched.',
            count: wishlist.length,
            data: wishlist,
        })
    } catch (err) {
        return next(err)
    }
}

exports.addWishlist = async (req, res, next) => {
    const { itemId } = req.body

    // Validation
    const { error } = addWishlistValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const item = await Item.findByPk(itemId)
        if (!item)
            return res.status(400).json({
                success: false,
                message: 'Item not found',
            })

        const wishlist = await Wishlist.findOne({ where: { userId, itemId } })
        if (wishlist)
            return res.status(400).json({
                success: false,
                message: 'Item already added to wishlist',
            })

        const createdWishlist = await Wishlist.create({
            itemId,
            userId,
        })
        return res.status(200).json({
            success: true,
            message: 'New wishlist was added.',
            data: createdWishlist,
        })
    } catch (err) {
        return next(err)
    }
}

exports.removeWishlist = async (req, res, next) => {
    const { itemId } = req.body

    // Validation
    const { error } = addWishlistValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const item = await Item.findByPk(itemId)
        if (!item)
            return res.status(400).json({
                success: false,
                message: 'Item not found',
            })

        const wishlist = await Wishlist.findOne({ where: { userId, itemId } })
        if (!wishlist)
            return res.status(400).json({
                success: false,
                message: 'Item not included in wishlist',
            })

        const deletedWishlist = await Wishlist.destroy({
            where: { itemId, userId },
        })

        return res.status(200).json({
            success: true,
            message: 'Wishlist was removed.',
            data: deletedWishlist,
        })
    } catch (err) {
        return next(err)
    }
}
