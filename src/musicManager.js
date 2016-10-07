const EventEmitter = require('events')
const createLogger = require('debug')

module.exports = class musicManager extends EventEmitter {
  constructor(connection, { maxHistory } = { maxHistory: 100 }) {
    // store the arguments
    this._connection = connection
    this.options = { maxHistory }

    // create the internal logger with a name according to the voiceChannel's name
    this.log = createLogger(`chordlr:musicManager:${ this._connection.channel.name }`)
    // set interal properties
    this.queue = []
    this.history = []
  }

  // create the router for events, the manager can only be controlled by events
  initEventRouter() {
    this.log('initEventRouter')

    // new song
    this.on('new song', (song, index = this.queue.length) => {
      this.log(`new song: ${ song.title }`)
      this.queue.splice(index, 0, song)
    })

    // next song
    this.on('next song', (oldSong) => {
      this.log('next song')
      this.history.unshift(oldSong)
      this.history.slice(0, this.options.maxHistory)
    })

    // play
    this.on('play', (song) => {
      this.log('play')
      this._connection.playStream(song.stream)
    })

    // pause/unpause
    this.on('speaking', this.setPaused)
  }
  // bind connection events to manager events
  initBinds(dispatcher) {
    this.log('initBinds')
    dispatcher.on('start', () => this.emit('start'))
    dispatcher.on('error', (e) => this.emit('error', e))
    dispatcher.on('end', () => this.emit('end'))
    dispatcher.on('speaking', (state) => this.emit('speaking', state))
  }

  // convenient alias
  get dispatcher() {
    return this._connection.player.dispatcher
  }

  setPaused(state) {
    this.paused = state
  }
}
