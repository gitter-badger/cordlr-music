const { resumed, notInVoiceChannel } = require('../messages')

module.exports = {
  name: 'resume',
  usage: 'resume',

  run(message) {
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.musicManager.resume()
      message.reply(resumed())
    } else {
      message.reply(notInVoiceChannel())
    }
  }
}
