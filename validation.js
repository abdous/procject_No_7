const Joi = require('@hapi/joi')


const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}
const signupValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        username: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.loginValidation = loginValidation
module.exports.signupValidation = signupValidation