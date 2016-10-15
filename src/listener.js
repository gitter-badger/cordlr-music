const commands = require('./commands')
const log = require('debug')('cordlr-music:listener')
const { noSuchCommand } = require('./util/messages')

module.exports = function musicListener(message, args) {
  log(`received message: '${ message.content }'`)

  if (commands.has(args[0])) {
    commands.get(args[0]).run(message, args)
  } else {
    message.reply(noSuchCommand())
  }
}
