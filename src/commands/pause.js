const { pausedSong } = require('../util/messages')

module.exports = {
  name: 'pause',
  usage: 'pause',

  run(message) {
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.musicManager.pause()
      message.reply('paused')
    } else {
      message.reply(pausedSong())
    }
  }
}
