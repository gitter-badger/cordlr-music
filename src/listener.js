const commands = require('./commands')
const log = require('debug')('cordlr-music:listener')

module.exports = (message, args) => {
  log('received message:', message)

  if (commands.has(args._[1])) {
    return commands.get(args._[1]).run(message, args)
  }
}
