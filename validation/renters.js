const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().required(),
        color: Joi.string().required(),
        subCategoryId: Joi.string().required(),
    })
    return schema.validate(data)
}

exports.orderStatusValidation = (data) => {
    const schema = Joi.object({
        status: Joi.string()
            .valid('approved', 'refused', 'delivered', 'received')
            .required(),
    })
    return schema.validate(data)
}
