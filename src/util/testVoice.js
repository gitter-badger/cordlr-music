const { notInVoiceChannel } = require('./messages')

module.exports = function testVoice(message) {
  const voice = message.guild.voiceConnection && message.guild.voiceConnection.musicManager

  if (!voice) {
    message.reply(notInVoiceChannel())
  }
  return voice
}
