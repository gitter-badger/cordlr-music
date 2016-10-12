const log = require('debug')('cordlr-music:app')
const listener = require('./listener')

module.exports = () => {
  // release listener
  log('releasing listener')
  return listener
}

exports.command = 'music'
exports.usage = 'music <method> [params...]'
