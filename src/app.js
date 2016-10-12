const log = require('debug')('cordlr-music:app')
const listener = require('./listener')

module.exports = function cordlrMusic() {
  cordlrMusic.command = 'music'
  cordlrMusic.usage = 'music <method> [params...]'

  // release listener
  log('releasing listener')
  return listener
}
