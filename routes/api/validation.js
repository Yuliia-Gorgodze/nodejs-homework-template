const Joi = require('joi')
const regularNumber = /[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/
const regularName = /[A-Za-z]{1,}/
const schemaCreateContact = Joi.object({
  name: Joi.string()
    .pattern(regularName)
    .min(2)
    .max(30)
    .required(),

  phone: Joi.string()
    .pattern(regularNumber)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'gmail', 'mail'] },
    })
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(regularName)
    .min(2)
    .max(30)
    .optional(),

  phone: Joi.string()
    .pattern(regularNumber)
    .min(14)
    .max(14)
    .optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'gmail', 'mail'] },
    })
    .optional(),
})

const validate = (shema, body, next) => {
  const { error } = shema.validate(body)

  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    })
  }
  next()
}

module.exports.validateCreateContact = (req, _, next) => {
  console.log(req.body)
  return validate(schemaCreateContact, req.body, next)
}

module.exports.validateUpdateContact = (req, _, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
