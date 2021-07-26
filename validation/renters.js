const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': `"Name" should be a type of 'text'`,
            'string.empty': `"Name" cannot be an empty field`,
            'any.required': `"Name" is a required field`,
        }),
        description: Joi.string().required().messages({
            'string.base': `"Description" should be a type of 'text'`,
            'string.empty': `"Description" cannot be an empty field`,
            'any.required': `"Description" is a required field`,
        }),
        price: Joi.number().required().messages({
            'string.base': `"Price" should be a type of 'number'`,
            'string.empty': `"Price" cannot be an empty field`,
            'any.required': `"Price" is a required field`,
        }),
        size: Joi.string().required().messages({
            'string.base': `"Size" should be a type of 'text'`,
            'string.empty': `"Size" cannot be an empty field`,
            'any.required': `"Size" is a required field`,
        }),
        color: Joi.string().required().messages({
            'string.base': `"Color" should be a type of 'text'`,
            'string.empty': `"Color" cannot be an empty field`,
            'any.required': `"Color" is a required field`,
        }),
        subCategoryId: Joi.string().required().messages({
            'string.base': `"Sub Category" should be a type of 'text'`,
            'string.empty': `"Sub Category" cannot be an empty field`,
            'any.required': `"Sub Category" is a required field`,
        }),
    })
    return schema.validate(data)
}

exports.orderStatusValidation = (data) => {
    const schema = Joi.object({
        status: Joi.string()
            .valid('approved', 'refused', 'delivered', 'received')
            .required()
            .messages({
                'string.base': `"Status" should be a type of 'text'`,
                'string.valid': `This status value is not valid`,
                'string.empty': `"Status" cannot be an empty field`,
                'any.required': `"Status" is a required field`,
            }),
    })
    return schema.validate(data)
}
