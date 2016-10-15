const Song = require('../util/Song')
const log = require('debug')('cordlr-music:command:add')
const { addedSong, errorAddedSong } = require('../util/messages')

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
        message.reply(addedSong(song.title))
      })
      .catch((err) => {
        log(err)
        message.reply(errorAddedSong())
      })
  }
}
