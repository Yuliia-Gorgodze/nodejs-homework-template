const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')

const { validateCreateContact, validateUpdateContact, validateMongoId } = require('./validation')
router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validateCreateContact, ctrl.addContact)

router.delete('/:contactId', validateMongoId, ctrl.removeContact)

router.patch('/:contactId', validateMongoId, validateUpdateContact, ctrl.updateContact)

module.exports = router
