const EventEmitter = require('events')
const log = require('debug')('cordlr-music:musicManager')
const { nowPlaying } = require('./util/messages')

const defaultOptions = {
  maxHistory: 50,
  autoPlay: true,
  volume: 0.5 // most songs are too loud so set it to half by default
}

module.exports = class musicManager extends EventEmitter {
  constructor(connection, { maxHistory, autoPlay, volume } = defaultOptions) {
    // init super
    super()
    // store the arguments
    this._connection = connection
    this.options = {
      maxHistory,
      autoPlay,
      volume
    }

    // set interal properties
    this.queue = []
    this.history = []

    this.init()
  }

  // create the router for events, the manager can only be controlled by events
  init() {
    log(`${ this._connection.channel.guild.name }  init`)

    // stream end in dispatcher
    this.on('dispatcher end', () => {
      this._boundDispatcher = null
      this.emit('song end')
    })

    // if autoPlay, start when song ends
    if (this.options.autoPlay) {
      this.on('song end', () => {
        this.next()
        if (this.queue[0]) {
          this.start()
        }
      })
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
    if (this.options.autoPlay && this.queue[0] === song) {
      this.start()
    }
  }

  next(amount = 1) {
    this.forceStop()
    for (let i = 0; i < amount; i++) {
      log(`${ this._connection.channel.guild.name }:next`)
      if (this.queue[0]) {
        this.history.unshift(this.queue.shift())
      }
    }
  }

  start() {
    const song = this.queue[0]
    log(`${ this._connection.channel.guild.name }:start ${ song.title }`)
    if (this._boundDispatcher) {
      this.forceStop()
    }
    this.emit('start', song)
    const stream = song.getStream()
    const dispatcher = this._connection.playStream(stream)
    dispatcher.setVolume(this.options.volume)
    stream.on('error', (err) => {
      dispatcher.end() // manually end dispatcher to avoid interference with a possible next stream
      log(`${ this._connection.channel.guild.name }:encountered error on stream`, err)
    })
    this.bind(dispatcher)
    song.commandChannel.sendMessage(nowPlaying(song.title))
  }

  stop() {
    if (this._boundDispatcher) {
      this._boundDispatcher.end()
    }
  }

  forceStop() {
    const old = this.options.autoPlay
    this.options.autoPlay = false
    this.stop()
    this.options.autoPlay = old
  }

  setVolume(volume) {
    this.options.volume = volume
    if (this._boundDispatcher) {
      this._boundDispatcher.setVolume(volume)
    }
  }

  setVolumeLog(volume) {
    this.options.volume = Math.pow(volume, 1.660964)
    if (this._boundDispatcher) {
      this._boundDispatcher.setVolumeLogarithmic(volume)
    }
  }

  setVolumeDb(volume) {
    this.options.volume = Math.pow(10, volume / 20)
    if (this._boundDispatcher) {
      this._boundDispatcher.setVolumeDecibels(volume)
    }
  }
}
