const fs = require('fs')
const path = require('path')

const package = require('../package.json')

Object.keys(package.exports).forEach((key) => {
  if (key === '.') {
    return
  }
  
  const packagePath = path.join(__dirname, `../${key}/package.json`)
  const packageName = `${package.name}/${key.split('/')[key.split('/').length - 1]}`
  const packageContent = JSON.stringify({
    name: packageName,
    export: {
      '.': Object.keys(package.exports[key]).reduce((result, item) => {
        return Object.assign(result, {
          [item]: path.join('../', package.exports[key][item])
        })
      }, {})
    }
  }, null, 2)
  const packageDirPath = path.join(__dirname, `../${key}`)
  if (!fs.existsSync(packageDirPath)) {
    fs.mkdirSync(packageDirPath)
  }
  fs.writeFileSync(packagePath, packageContent)
})
