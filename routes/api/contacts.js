const express = require('express')
const router = express.Router()
const Contacts = require('../../model')
const { validateCreateContact, validateUpdateContact } = require('./validate')

router.get('/', async (req, res, next) => {
  try {
    const result = await Contacts.listContacts()
    return res.json({ status: 'succes', code: 200, data: { result } })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await Contacts.getContactById(req.params.contactId)
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
})

router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const result = await Contacts.addContact(req.body)
    res.status(201).json({ status: 'succes', code: 201, data: { result } })
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await Contacts.removeContact(req.params.contactId)
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId', validateUpdateContact, async (req, res, next) => {
  try {
    const result = await Contacts.updateContact(req.params.contactId, req.body)
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
})

module.exports = router
