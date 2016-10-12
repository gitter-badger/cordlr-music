const commands = require('./commands')
const log = require('debug')('cordlr-music:listener')

module.exports = function musicListener(message, args) {
  log(`received message: '${ message.content }'`)

  if (commands.has(args[0])) {
    return commands.get(args[0]).run(message, args)
  }
}
