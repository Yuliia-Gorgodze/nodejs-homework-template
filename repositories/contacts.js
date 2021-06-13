const Contact = require('../model/contact')
const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    offset = 0
  } = query
  const optionsSearch = { owner: userId }
  if (favorite !== null) {
    optionsSearch.isFavorite = favorite
  }
  const results = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortBy ? { [`${sortByDesc}`]: -1 } : {})
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'name email gender phone -id'
    }
  })
  return results
}

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name email gender phone '
  })
  return result
}

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove(
    { _id: contactId, owner: userId })
  return result
}

const addContact = async (userId, body) => {
  console.log('это ещё работает ')
  const result = await Contact.create({ owner: userId, ...body })
  console.log(result)
  return result
}

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },)
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
