const EventEmitter = require('events')
const log = require('debug')('cordlr-music:musicManager')

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

    // set interal properties
    this.queue = []
    this.history = []

    this.init()
  }

  // create the router for events, the manager can only be controlled by events
  init() {
    log(`${ this._connection.channel.guild.name }  init`)

    // song end
    this.on('song end', () => {
      log(`${ this._connection.channel.guild.name }:song end:${ this.queue[0].title }`)
      this.next()
    })

    // stream end in dispatcher
    this.on('dispatcher end', () => {
      this._boundDispatcher = null
      this.emit('song end')
    })

    // if autoPlay, start when song ends
    if (this.options.autoPlay) {
      this.on('song end', () => this.start())
    }
  }

  // bind dispatcher events to manager events
  bind(dispatcher = this.dispatcher) {
    log(`${ this._connection.channel.guild.name }:bind`)
    dispatcher.on('error', e => this.emit('error', e))
    dispatcher.on('end', () => this.emit('dispatcher end'))
    dispatcher.on('speaking', state => this.emit('speaking', state))

    this._boundDispatcher = dispatcher
  }

  pause() {
    this._boundDispatcher._setPaused(true)
  }

  resume() {
    this._boundDispatcher._setPaused(false)
  }

  addSong(song, index = this.queue.length) {
    this.queue.splice(index, 0, song)
  }

  next(amount = 1) {
    this.stop()
    for (let i = 0; i < amount; i++) {
      log(`${ this._connection.channel.guild.name }:next`)
      this.history.unshift(this.queue.shift())
    }
  }

  start() {
    const song = this.queue[0]
    log(`${ this._connection.channel.guild.name }:start ${ song.title }`)
    if (this._boundDispatcher) {
      this.stop()
    }
    this.emit('start', song)
    const stream = song.getStream()
    const dispatcher = this._connection.playStream(stream)
    stream.on('error', (err) => {
      dispatcher.end() // manually end dispatcher to avoid interference with a possible next stream
      log(`${ this._connection.channel.guild.name }:encountered error on stream`, err)
    })
    this.bind(dispatcher)
    song.commandChannel.sendMessage(`started playing ${ song.title }`)
  }

  stop() {
    if (this._boundDispatcher) {
      this.emit('stop')
      this._boundDispatcher.end()
    }
  }
}
