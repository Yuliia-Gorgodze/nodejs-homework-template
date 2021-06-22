const Contact = require('../model/contact')

const listContacts = async (userId, query) => {
  try {
    const {
      sortBy,
      sortByDesc,
      filter,
      favorite = false,
      limit = 5,
      page = 1,
    } = query

    const optionsSearch = { owner: userId }
    if (favorite) {
      optionsSearch.favorite = favorite
    }
    const allContacts = await Contact.paginate(optionsSearch, {
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? { filter: [favorite] } : '',
      populate: { path: 'owner', select: 'name email subscription -_id' },
    })
    return allContacts
  } catch (error) {
    console.log(error)
  }
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
