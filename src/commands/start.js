const testVoice = require('../util/testVoice')

module.exports = {
  name: 'start',
  usage: 'start',

  run(message) {
    if (!testVoice(message)) return
    message.guild.voiceConnection.musicManager.start()
  }
}
