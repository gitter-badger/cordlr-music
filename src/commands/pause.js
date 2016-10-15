const { pausedSong } = require('../util/messages')
const testVoice = require('../util/testVoice')

module.exports = {
  name: 'pause',
  usage: 'pause',

  run(message) {
    if (!testVoice(message)) return
    message.guild.voiceConnection.musicManager.pause()
    message.reply(pausedSong())
  }
}
