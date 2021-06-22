const multer = require('multer')
const path = require('path')

require('dotenv').config()
const UPLOAD_DIR = process.env.UPLOAD_DIR

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()} - ${file.originalname}`)
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 200000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
    }
    const error = new Error('Wrong format file for avatar')
    error.status = 400
    cb(error)
  }
})

module.exports = upload
