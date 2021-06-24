const Users = require('../repositories/users')
const { HttpCode } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs/promises')
const UploadAvatarService = require('../services/local-upload')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email is already used' })
    }
    const { id, name, email, gender, avatar } = await Users.create(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'succes',
      code: HttpCode.CREATED,
      data: { id, name, email, gender, avatar }
    })
  } catch (e) {
    next(e)
  }
}
const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)

    const isValidPassword = await user?.isValidPassword(req.body.password)
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials'
      })
    }
    const id = user.id
    const payload = { id, test: 'Text for payload' }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(id, token)
    return res.json({ status: 'succes', code: 200, data: { token } })
  } catch (e) {
    next(e)
  }
}
const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({ })
  } catch (e) {
    next(e)
  }
}

/* local upload */

const avatars = async (req, res, next) => {
  try {
    if (!req.user?.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      })
    };

    const id = req.user.id
    const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS)
    const avatarURL = await uploads.saveAvatar({ idUser: id, file: req.file })
    console.log(avatarURL)
    try {
      await fs.unlink(path.join(process.env.AVATAR_OF_USERS, req.user.avatar))
    } catch (e) {
      console.log(e.message)
    };

    await Users.updateAvatar(id, avatarURL)
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarURL }
    })
  } catch (error) {
    next(error)
  };
}

const current = async (req, res, next) => {
  try {
    const { email, subscription, name } = req.user
    return res
      .status(HttpCode.OK)
      .json({
        status: 'success',
        code: HttpCode.OK,
        data: { email, subscription, name }
      })
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, logout, current, avatars }
