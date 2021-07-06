const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const {
    registerValidation,
    activateAccountValidation,
    loginValidation,
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
