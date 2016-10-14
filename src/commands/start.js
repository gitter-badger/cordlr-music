const { notInVoiceChannel } = require('../messages')

module.exports = {
  name: 'start',
  usage: 'start',

  run(message) {
    const connection = message.guild.voiceConnection
    if (!connection) {
      message.reply(notInVoiceChannel())
    }
    connection.musicManager.start()
  }
}
