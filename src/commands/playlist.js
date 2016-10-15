const { noArg, noPlaylistId, startPlaylist, errorPlSong } = require('../util/messages')
const Song = require('../util/Song')
const ytpl = require('../util/ytpl')
const log = require('debug')('cordlr-music:command:playlist')
const testVoice = require('../util/testVoice')

module.exports = {
  name: 'playlist',
  usage: 'playlist <playlist url>',

  run(message, args) {
    const API_KEY = 'AIzaSyBUCT0piaZuI6W6dCvXt4LdWoQ4vMmCwZY'
    if (!testVoice(message)) return
    if (!args[1]) {
      return message.reply(noArg())
    }
    const pidReg = /.+list=(.+)&?/
    const pid = args[1].match(pidReg)[1]
    if (!pid) {
      return message.reply(noPlaylistId())
    }
    message.reply(startPlaylist())
    const songStream = ytpl(pid, API_KEY)

    const todo = []
    let index = 0
    let running = false
    let interval
    songStream.on('data', (data) => {
      todo.push(data)
      if (!running) {
        running = true
        interval = setInterval(() => {
          if (!todo[index]) return clearInterval(interval)
          const url = `https://www.youtube.com/watch?v=${ todo[index].contentDetails.videoId }`
          Song.getInfo(url)
            .then((info) => {
              const song = new Song(url, info, message.author, message.channel)
              message.guild.voiceConnection.musicManager.addSong(song)
            })
            .catch((e) => {
              log('an error occured while getting a playlist song', e)
              message.reply(errorPlSong())
            })
          index++
        }, 30)
      }
    })
    songStream.on('error', e => log('error during playlist request', e))
  }
}

// `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`
