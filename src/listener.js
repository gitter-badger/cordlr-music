const Song = require('./structures/Song')
const actions = require('./state/actions')
const log = require('debug')('chordlr:listener')

module.exports = (store, message, args) => {
  log(`recevied message: ${ message }`)
  if (args[1] === 'add') {
    Song.getInfo(args[2])
      .then((info) => {
        const song = new Song(args[2], info.title, info.length_seconds, message.author)
        store.dispatch(actions.NEW_SONG(song))
      })
      .catch((error) => {
        // TODO inspect the error to determine wether url is bad or other error
        message.reply('That is an invalid url')
        log('Error with Song.getInfo', error)
      })
  }
}
