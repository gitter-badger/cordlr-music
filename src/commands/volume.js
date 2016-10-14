const { noArg, notInVoiceChannel, changeVolume } = require('../messages')

module.exports = {
  name: 'volume',
  usage: 'volume <percentage>',

  run(message, args) {
    if (!args[1]) {
      message.reply(noArg())
      return
    }
    const newVolume = args[1] / 100
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.musicManager.setVolumeLog(newVolume)
      message.reply(changeVolume())
    } else {
      message.reply(notInVoiceChannel())
    }
  }
}
