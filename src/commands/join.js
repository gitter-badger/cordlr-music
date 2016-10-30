const MusicManager = require('../musicManager')
const log = require('debug')('cordlr-music:command:join')
const { userNotInVoice } = require('../util/messages')

module.exports = {
  name: 'join',
  usage: 'join <channel name> (if none is specified, join person who issued command)',

  run(message) {
    const voiceChannel = message.member.voiceChannel
    if (!voiceChannel) {
      return message.reply(userNotInVoice())
    }
    log(`joining ${ voiceChannel.guild.name }:${ voiceChannel.name }`)
    return voiceChannel.join()
      .then((connection) => {
        // attach MusicManager
        connection.musicManager = new MusicManager(connection)
      })
  }
}
