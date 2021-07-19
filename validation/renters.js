exports.orderStatusValidation = (data) => {
    const schema = Joi.object({
        status: Joi.string()
            .valid('approved', 'refused', 'delivered', 'received')
            .required(),
    })
    return schema.validate(data)
}
