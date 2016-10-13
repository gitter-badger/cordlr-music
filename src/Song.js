const ytdl = require('ytdl-core')
const log = require('debug')('cordlr-music:')

module.exports = class Song {
  constructor(url, { title, length_seconds: lengthSeconds }, addedBy, commandChannel) {
    log(`created ${ title }`)
    this.url = url
    this.title = title
    this.lengthSecconds = lengthSeconds
    this.addedBy = addedBy
    this.commandChannel = commandChannel
  }

  formatLength() {
    return `${ Math.floor(this.lengthSeconds / 60) }:${ this.lengthSeconds % 60 }`
  }

  getStream() {
    log('created stream')
    const stream = ytdl(this.url, { format: 'audioonly' })

    return stream
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
