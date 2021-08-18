const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        color: Joi.string().required(),
        size: Joi.string().required(),
        subCategoryId: Joi.string().required(),
        userId: Joi.string().required(),
    })
    return schema.validate(data)
}
