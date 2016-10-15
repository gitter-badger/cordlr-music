const testVoice = require('../util/testVoice')

module.exports = {
  name: 'restart',
  usage: 'restart',

  run(message) {
    if (!testVoice(message)) return
    const manager = message.guild.voiceConnection.musicManager
    manager.forceStop()
    manager.start()
  }
}
