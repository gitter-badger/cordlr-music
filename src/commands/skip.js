const testVoice = require('../util/testVoice')
const log = require('debug')('cordlr-music:command:skip')

module.exports = {
  name: 'skip',
  usage: 'skip [amount]',

  run(message, args) {
    if (!testVoice(message)) return
    log('before:', args[1])
    if (!args[1]) args[1] = 1
    log('after', args[1])

    message.guild.voiceConnection.musicManager.next(args[1])
    message.guild.voiceConnection.musicManager.start()
  }
}
