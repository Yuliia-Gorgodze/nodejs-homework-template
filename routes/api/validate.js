const Joi = require('joi')

const validateCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.number().integer().required,
  email: Joi.string().required()
})

const validateUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.number().integer().required,
  email: Joi.string().required()
}).or('name', 'phone', 'email')

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.message
    })
  }
}

module.exports = {
  validateCreateContact: (req, res, next) => {
    return validate(validateCreateContact, req.body, next)
  },
  validateUpdateContact: (req, res, next) => {
    return validate(validateUpdateContact, req.body, next)
  }
}
