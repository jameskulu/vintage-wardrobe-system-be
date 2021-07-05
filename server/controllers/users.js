const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const mg = require('../config/mailgun')
const { registerValidation } = require('../validation/users')

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body

    // Validation
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    try {
        // Checking if username exists
        const usernameExists = await User.findOne({ where: { username } })

        if (usernameExists)
            return res.status(400).json({
                success: false,
                message: 'Username was already taken.',
            })

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
            username,
            email,
            password: hashedPassword,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false,
        })

        const verificationData = {
            from: 'noreply@hello.com',
            to: registeredUser.email,
            subject: 'Account Activation Link',
            html: `
            <h2>Please click on given link to activate your account</h2>
            <p>${process.env.CLIENT_URL}/verify-email/${registeredUser.emailToken}</p>
        `,
        }

        // Sending verification email
        await mg.messages().send(verificationData)
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
