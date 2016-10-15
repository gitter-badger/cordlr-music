const { resumed } = require('../util/messages')
const testVoice = require('../util/testVoice')
module.exports = {
  name: 'resume',
  usage: 'resume',

  run(message) {
    if (!testVoice(message)) return
    message.guild.voiceConnection.musicManager.resume()
    message.reply(resumed())
  }
}
