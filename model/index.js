const fs = require('fs/promises')
const path = require('path')
const shortid = require('shortid')

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8')
  return JSON.parse(data)
}
const listContacts = async () => {
  return await readData()
}

const getContactById = async (contactId) => {
  const data = await readData()
  const [result] = data.find((contact) => String(contact.id) === contactId)
  return result
}

const removeContact = async (contactId) => {
  const data = await readData()
  const result = await getContactById(contactId)
  const index = data.filter(contact => String(contact.id) !== contactId)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(index))
  return result
}

const addContact = async (body) => {
  const id = shortid.generate()
  const record = {
    id,
    ...body
  }
  const data = await readData()
  data.push(record)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(data))
  return record
}

const updateContact = async (contactId, body) => {
  const data = await readData()
  const [result] = data.filter(contact => String(contact.id) === contactId)
  if (result) {
    Object.assign(result, body)
    await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(data))
  }
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
