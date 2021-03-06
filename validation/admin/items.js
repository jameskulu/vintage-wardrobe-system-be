const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        color: Joi.string().required(),
        size: Joi.string().required(),
        subCategoryId: Joi.string().required(),
        images: Joi.allow('', null),
    })
    return schema.validate(data)
}
