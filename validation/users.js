const Joi = require('@hapi/joi')

exports.registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().messages({
            'string.base': `"First Name" should be a type of 'text'`,
            'string.empty': `"First Name" cannot be an empty field`,
            'any.required': `"First Name" is a required field`,
        }),
        lastName: Joi.string().required().messages({
            'string.base': `"Last Name" should be a type of 'text'`,
            'string.empty': `"Last Name" cannot be an empty field`,
            'any.required': `"Last Name" is a required field`,
        }),
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            })
            .messages({
                'string.base': `"Email" should be a type of 'text'`,
                'string.empty': `"Email" cannot be an empty field`,
                'string.email': `"Email" is not a valid email`,
                'any.required': `"Email" is a required field`,
            }),
        password: Joi.string().min(6).required().messages({
            'string.base': `"Password" should be a type of 'text'`,
            'string.empty': `"Password" cannot be an empty field`,
            'any.required': `"Password" is a required field`,
        }),
    })
    return schema.validate(data)
}

exports.activateAccountValidation = (data) => {
    const schema = Joi.object({
        token: Joi.string().required().messages({
            'string.base': `"Password" should be a type of 'text'`,
            'string.empty': `"Password" cannot be an empty field`,
            'any.required': `"Password" is a required field`,
        }),
    })
    return schema.validate(data)
}

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            })
            .messages({
                'string.base': `"Password" should be a type of 'text'`,
                'string.empty': `"Password" cannot be an empty field`,
                'string.email': `"Email" is not a valid email`,
                'any.required': `"Password" is a required field`,
            }),
        password: Joi.string().min(6).required().messages({
            'string.base': `"Password" should be a type of 'text'`,
            'string.empty': `"Password" cannot be an empty field`,
            'any.required': `"Password" is a required field`,
        }),
    })
    return schema.validate(data)
}

exports.forgotPasswordValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            })
            .messages({
                'string.base': `"Email" should be a type of 'text'`,
                'string.empty': `"Email" cannot be an empty field`,
                'string.email': `"Email" is not a valid email`,
                'any.required': `"Email" is a required field`,
            }),
    })
    return schema.validate(data)
}

exports.resetPasswordValidation = (data) => {
    const schema = Joi.object({
        newPassword: Joi.string().required().messages({
            'string.base': `"New Password" should be a type of 'text'`,
            'string.empty': `"New Password" cannot be an empty field`,
            'any.required': `"New Password" is a required field`,
        }),
        token: Joi.string().required().messages({
            'string.base': `"Token" should be a type of 'text'`,
            'string.empty': `"Token" cannot be an empty field`,
            'any.required': `"Token" is a required field`,
        }),
    })
    return schema.validate(data)
}

exports.addWishlistValidation = (data) => {
    const schema = Joi.object({
        itemId: Joi.string().required().messages({
            'string.base': `"itemId" should be a type of 'text'`,
            'string.empty': `"itemId" cannot be an empty field`,
            'any.required': `"itemId" is a required field`,
        }),
    })
    return schema.validate(data)
}
