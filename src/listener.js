const commands = require('./commands')
const log = require('debug')('chordlr:listener')

module.exports = (client, message, args) => {
  log(`recevied message: ${ message }`)

  if (commands.has(args[1])) {
    return commands.get(args[1]).run(message)
  }
}
