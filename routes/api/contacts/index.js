const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')

const { validateCreateContact, validateUpdateContact, validateMongoId } = require('./validation')
router.get('/', guard, ctrl.listContacts)

router.get('/:contactId', guard, ctrl.getContactById)

router.post('/', guard, validateCreateContact, ctrl.addContact)

router.delete('/:contactId', guard, validateMongoId, ctrl.removeContact)

router.patch('/:contactId', guard, validateMongoId, validateUpdateContact, ctrl.updateContact)

module.exports = router
