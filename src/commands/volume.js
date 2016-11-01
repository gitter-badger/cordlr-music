const { noArg, changeVolume } = require('../util/messages')
const testVoice = require('../util/testVoice')
const log = require('debug')('corldlr-music:command:volume')

module.exports = {
  name: 'volume',
  usage: 'volume <percentage> [method](log | db | scale)',

  run(message, args) {
    if (!testVoice(message)) return
    if (!args[1]) {
      message.reply(noArg())
      return
    }
    const newVolume = args[1] / 100
    log(`setting volume to ${ newVolume }% with setting ${ args[2] ? args[2] : 'log' }`)
    if (newVolume >= 300) {
      log('Not allowing volumes over 300, people hate it.')
    }
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
  }
}
