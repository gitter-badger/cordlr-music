const testVoice = require('../util/testVoice')
const log = require('debug')('cordlr-music:command:skip')

module.exports = {
  name: 'skip',
  usage: 'skip [amount]',

  run(message, args) {
    if (!testVoice(message)) return
    if (!args[1]) args[1] = 1
    log('skip amount:', args[1])

    const manager = message.guild.voiceConnection.musicManager
    manager.next(args[1])
    if (manager.queue[0]) {
      manager.start()
    } else {
      log(`${ message.guild.name }:no next song, stopping`)
    }
  }
}
