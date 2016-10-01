const Song = require('./structures/Song')
const actions = require('./state/actions')
const log = require('debug')('chordlr:listener')

module.exports = (bot, store, message, args) => {
  log(message)
  if (args[1] === 'add') {
    Song.getInfo(args[2])
      .then((info) => {
        const song = new Song(args[2], info.title, info.length_seconds, message.author)
        store.dispatch(actions.newSong(song))
      })
      .catch((error) => {
        message.reply('That is an invalid url')
        log('Error with Song.getInfo', error)
      })
  }
}
