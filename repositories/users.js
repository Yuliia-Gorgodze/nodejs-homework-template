const User = require('../model/users')

const findById = async(id) => {
  return await User.findById(id)
}
const findByEmail = async(email) => {
  return await User.findOne({ email })
}

const create = async (body) => {
  const user = new User(body)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}
const updateAvatar = async (id, avatar, idCloudAvatar = null) => {
  console.log('repositories idCloudAvatar', idCloudAvatar)
  return await User.updateOne({ _id: id }, { avatar, idCloudAvatar })
}

module.exports = {
  findById, findByEmail, create, updateToken, updateAvatar
}
