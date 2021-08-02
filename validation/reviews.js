const Joi = require('@hapi/joi')

exports.addReviewValidation = (data) => {
    const schema = Joi.object({
        text: Joi.string().required().messages({
            'string.base': `"Text" should be a type of 'text'`,
            'string.empty': `"Text" cannot be an empty field`,
            'any.required': `"Text" is a required field`,
        }),
        rating: Joi.number().positive().allow(0).required().messages({
            'string.base': `"Rating" should be a type of 'number'`,
            'string.empty': `"Rating" cannot be an empty field`,
            'string.positive': `"Rating" cannot be a negative number`,
            'any.required': `"Rating" is a required field`,
        }),
        itemId: Joi.string().required().messages({
            'string.base': `"itemId" should be a type of 'text'`,
            'string.empty': `"itemId" cannot be an empty field`,
            'any.required': `"itemId" is a required field`,
        }),
    })
    return schema.validate(data)
}
