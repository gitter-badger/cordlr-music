const testVoice = require('../util/testVoice')
const { clearedQueue } = require('../util/messages')

module.exports = {
  name: 'clear',
  usage: 'clear',

  run(message) {
    if (!testVoice(message)) return
    const manager = message.guild.voiceConnection.musicManager
    manager.queue.splice(1)
    message.reply(clearedQueue())
  }
}
