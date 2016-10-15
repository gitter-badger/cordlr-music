const { noArg, notInVoiceChannel, changeVolume } = require('../util/messages')

module.exports = {
  name: 'volume',
  usage: 'volume <percentage> [method](log | db | scale)',

  run(message, args) {
    if (!args[1]) {
      message.reply(noArg())
      return
    }
    const newVolume = args[1] / 100
    if (message.guild.voiceConnection) {
      switch (args[2]) {
        case 'db':
          message.guild.voiceConnection.musicManager.setVolumeDb(newVolume)
          break
        case 'scale':
          message.guild.voiceConnection.musicManager.setVolume(newVolume)
          break
        case 'log':
        default:
          message.guild.voiceConnection.musicManager.setVolumeLog(newVolume)
          break
      }
      message.reply(changeVolume())
    } else {
      message.reply(notInVoiceChannel())
    }
  }
}
