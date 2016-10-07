const log = require('debug')('chordlr:main')
const listener = require('./listener')

module.exports = (client) => {
  // release listener
  log('releasing listener')
  return listener.bind(null, client)
}

// TODO move this to separate config file
exports.command = 'music'
exports.usage = 'music <method> [params...]'
