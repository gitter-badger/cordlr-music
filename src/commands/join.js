const MusicManager = require('../musicManager')

module.exports = {
  name: 'join',
  usage: 'join <channel name> (if none is specified, join person who issued command)',

  run(message) {
    const voiceChannel = message.guild.channels
    .findAll('type', 'voice')
    .find((elem) => elem.members.exists((value) => value.user.equals(message.author)))
    return voiceChannel.join()
      .then((connection) => {
        // attach MusicManager
        connection.channel.musicManager = new MusicManager(connection)
      })
  }
}
