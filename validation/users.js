const Joi = require('@hapi/joi')

exports.registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().messages('First Name is required'),
        lastName: Joi.string().required().messages('Last Name is required'),
        email: Joi.string()
            .min(6)
            .required()
            .messages('Email is required')
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages('Password is required'),
    })
    return schema.validate(data)
}

exports.activateAccountValidation = (data) => {
    const schema = Joi.object({
        token: Joi.string().required(),
    })
    return schema.validate(data)
}

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .messages('Email is required')
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages('Password is required'),
    })
    return schema.validate(data)
}

exports.forgotPasswordValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .messages('Email is required')
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
    })
    return schema.validate(data)
}

exports.resetPasswordValidation = (data) => {
    const schema = Joi.object({
        newPassword: Joi.string()
            .required()
            .messages('New password is required'),
        token: Joi.string().required().messages('Token is required'),
    })
    return schema.validate(data)
}
