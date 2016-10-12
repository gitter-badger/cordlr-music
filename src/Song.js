const ytdl = require('ytdl-core')
const createLogger = require('debug')

module.exports = class Song {
  constructor(url, { title, length_seconds: lengthSeconds }, addedBy) {
    this.log = createLogger(`cordlr-music:Song:${ title }`)

    this.log('created')
    this.url = url
    this.title = title
    this.lengthSecconds = lengthSeconds
    this.addedBy = addedBy

    // store the stream here
    this._stream = null
  }

  formatLength() {
    return `${ Math.floor(this.lengthSeconds / 60) }:${ this.lengthSeconds % 60 }`
  }

  get stream() {
    if (this._stream === null) {
      this.log('created stream')
      this._stream = ytdl(this.url, { format: 'audioonly' })
    }

    return this._stream
  }

  //  export with Song and wrap in promise
  static getInfo() {
    return new Promise((resolve, reject) => {
      ytdl.getInfo(...arguments, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
