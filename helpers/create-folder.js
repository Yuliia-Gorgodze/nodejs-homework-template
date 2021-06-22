const fs = require('fs/promises')

const isAcessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

const createFolderIsNotExist = async (folder) => {
  if (!(await isAcessible(folder))) {
    await fs.mkdir(folder)
  }
}

module.exports = createFolderIsNotExist
