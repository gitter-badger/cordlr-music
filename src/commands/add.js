const Song = require('../Song')
const log = require('debug')('cordlr-music:command:add')

module.exports = {
  name: 'add',
  usage: 'add <song url> [< index in queue>]',

  run(message, args) {
    return Song.getInfo(args[1])
      .then((info) => {
        const musicManager = message.client.voiceConnections.find((connection =>
          connection.channel.guild.id === message.channel.guild.id)).musicManager
        const song = new Song(args[1], info, message.author, message.channel)
        musicManager.addSong(song, args[2])
        message.reply('added!')
      })
      .catch((err) => {
        log(err)
        message.reply('error getting song info')
      })
  }
}
