const Contacts = require('../repositories/contacts')

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id

    const { docs: result, ...rest } = await Contacts.listContacts(userId, req.query)
    return res.json({ status: 'succes', code: 200, data: { result, ...rest } })
  } catch (e) {
    next(e)
  }
}
const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await Contacts.getContactById(userId, req.params.contactId)
    if (result) {
      return res.json({ status: 'succes', code: 200, data: { result } })
    }
    return res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id

    const result = await Contacts.addContact(userId, req.body)
    
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
    const userId = req.user.id
    const result = await Contacts.removeContact(userId, req.params.contactId)
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
    const userId = req.user.id
    const result = await Contacts.updateContact(userId, req.params.contactId, req.body)
 
    if (result) {
      return res.status(200).json({ status: 'succes', code: 200, data: { result } })
    }
    return res.status(200).json({ status: 'error', code: 404, message: 'Not found' })
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
