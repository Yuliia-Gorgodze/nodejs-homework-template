const Contacts = require('../repositories/contacts')

const listContacts = async (req, res, next) => {
  try {
    const result = await Contacts.listContacts()
    return res.json({ status: 'succes', code: 200, data: { result } })
  } catch (e) {
    next(e)
  }
}
const getContactById = async (req, res, next) => {
  try {
    const result = await Contacts.getContactById(req.params.contactId)
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    const result = await Contacts.addContact(req.body)
    res.status(201).json({ status: 'succes', code: 201, data: { result } })
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400
    }
    next(e)
  }
}
const removeContact = async (req, res, next) => {
  try {
    const result = await Contacts.removeContact(req.params.contactId)
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const result = await Contacts.updateContact(req.params.contactId, req.body)
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
}
