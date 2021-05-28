const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .pattern(/[A-Za-z]{1,}/)
    .min(2)
    .max(30)
    .required(),

  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .min(14)
    .max(14)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk', 'gmail', 'yandex', 'mail', 'co'] },
    })
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(/[A-Za-z]{1,}/)
    .min(2)
    .max(30)
    .optional(),

  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .min(14)
    .max(14)
    .optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk', 'gmail', 'yandex', 'mail', 'co'] },
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
  return validate(schemaCreateContact, req.body, next)
}

module.exports.validateUpdateContact = (req, _, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
