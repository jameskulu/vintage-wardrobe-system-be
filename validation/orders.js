const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object().keys({
        items: Joi.array()
            .items(
                Joi.object({
                    startDate: Joi.date().required(),
                    endDate: Joi.date().required(),
                    phoneNumber: Joi.string().required(),
                    address: Joi.string().required(),
                    city: Joi.string().required(),
                    country: Joi.string().required(),
                    totalPrice: Joi.number().required(),
                    itemId: Joi.string().required(),
                })
            )
            .required(),
    })
    return schema.validate(data)
}
