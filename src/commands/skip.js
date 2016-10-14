const { notInVoiceChannel } = require('../messages')

module.exports = {
  name: 'skip',
  usage: 'skip [<amount>]',

  run(message, args) {
    if (!message.guild.voiceChannel) {
      return message.reply(notInVoiceChannel())
    }

    if (!args[1]) {
      args[1] = 1
    }

    message.guild.voiceConnection.musicManager.next(args[1])
    message.guild.voiceConnection.musicManager.start()
  }
}