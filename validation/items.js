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
        subCategoryId: Joi.string().required().messages({
            'string.base': `"Sub Category" should be a type of 'text'`,
            'string.empty': `"Sub Category" cannot be an empty field`,
            'any.required': `"Sub Category" is a required field`,
        }),
    })
    return schema.validate(data)
}
