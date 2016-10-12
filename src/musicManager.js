const EventEmitter = require('events')
const createLogger = require('debug')

const defaultOptions = {
  maxHistory: 100,
  autoPlay: true
}

module.exports = class musicManager extends EventEmitter {
  constructor(connection, { maxHistory, autoPlay } = defaultOptions) {
    // init super
    super()
    // store the arguments
    this._connection = connection
    this.options = {
      maxHistory,
      autoPlay
    }

    // create the internal logger with a name according to the voiceChannel's name
    const guildName = this._connection.channel.guild.name
    const channelName = this._connection.channel.name
    this.log = createLogger(`cordlr-music:musicManager:${ guildName }:${ channelName }`)
    // set interal properties
    this.queue = []
    this.history = []

    this.init()
  }

  // create the router for events, the manager can only be controlled by events
  init() {
    this.log('initializing')
    // kill manager on disconnect
    this._connection.on('disconnected', this.kill)

    // // // // // //  // // // // // //
    //             Events             //
    // // // // // //  // // // // // //

    // new song
    this.on('new song', (song, index = this.queue.length) => {
      this.log(`new song: ${ song.title }`)
      this.queue.splice(index, 0, song)
    })

    // next song
    this.on('next song', () => {
      this.log('next song')
      this.history.unshift(this.queue.shift())
      this.history.slice(0, this.options.maxHistory)
    })

    // start playing song
    this.on('start song', (index = 0) => {
      const song = this.queue[index]
      this.log('start', song.title)
      if (this._boundDispatcher) {
        this._boundDispatcher.end()
      }
      const dispatcher = this._connection.playStream(song.stream)
      this.bind(dispatcher)
    })

    // pause/unpause
    this.on('pause', (state) => {
      try {
        this._boundDispatcher._setPaused(state)
      } catch (e) {
        this.log('error with state, expected bound dispatcher but none was found')
        // TODO handle error
      }
    })

    // end song
    this.on('song end', () => this.emit('next song'))

    // stream end in dispatcher
    this.on('dispatcher end', () => {
      this._boundDispatcher = null
    })

    // kill the musicManager
    this.on('kill', () => {
      this._boundDispatcher.end()
      this.log('killed')
    })

    // if autoPlay, emit start when song ends
    if (this.options.autoPlay) {
      this.on('song end', () => this.emit('start'))
    }
  }

  // bind dispatcher events to manager events
  bind(dispatcher = this.dispatcher) {
    this.log('bind')
    dispatcher.on('error', (e) => this.emit('error', e))
    dispatcher.on('end', () => this.emit('dispatcher end'))
    dispatcher.on('speaking', (state) => this.emit('speaking', state))

    this._boundDispatcher = dispatcher
  }

  // convenient alias
  get dispatcher() {
    if (!this._connection.player.dispatcher) this.log('dispatcher is undefined, but it was accessed')
    return this._connection.player.dispatcher
  }

  // forward pause and resume
  pause() {
    this.emit('pause', true)
  }

  resume() {
    this.emit('pause', false)
  }

  // shortcut methods, because emiting events looks ugly
  addSong() {
    this.emit('new song', ...arguments)
  }

  next(amount = 1) {
    this.emit('song end')
    for (let i = 0; i < amount; i++) {
      this.history.unshift(this.queue.shift())
    }
  }

  start() {
    this.emit('start song', ...arguments)
  }

  kill() {
    this.emit('kill')
  }
}
