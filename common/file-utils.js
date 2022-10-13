const fs = require('fs')

const getFile = (filename) => {
  if (fs.existsSync(filename)) {
    return fs.readFileSync(filename, 'utf8')
  } else {
    return undefined
  }
}

module.exports = {
  getFile
}
