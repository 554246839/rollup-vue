const { delDir } = require('./deldir')
const path = require('path')

delDir(path.resolve(__dirname, './dist'))
