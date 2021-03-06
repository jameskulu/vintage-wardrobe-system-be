const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'user').required(),
        gender: Joi.string().valid('ma', 'fe'),
        address: Joi.string().allow(''),
        city: Joi.string().allow(''),
        country: Joi.string().allow(''),
        image: Joi.allow('', null),
    })
    return schema.validate(data)
}
