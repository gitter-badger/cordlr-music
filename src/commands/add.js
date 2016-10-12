const Song = require('../Song')
const log = require('debug')('cordlr-music:command:add')

module.exports = {
  name: 'add',
  usage: 'add <song url> [< index in queue>]',

  run(message, args) {
    Song.getInfo(args._[2])
      .then((info) => {
        const musicManager = message.client.voiceConnections.find(((connection) =>
          connection.channel.guild.id === message.channel.guild.id)).musicManager
        const song = new Song(args._[2], info, message.author)
        musicManager.addSong(song, args._[3])
        message.reply('added!')
      })
      .catch((err) => {
        log(err)
        message.reply('error getting song info')
      })
  }
}
