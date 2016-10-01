const ytdl = require('ytdl-core');
const log = require('debug')('chordlr:Song');

module.exports = class Song {
  constructor(url, title, lengthSeconds, addedBy) {
    log(`new Song: ${ title }`);
    this.url = url;
    this.title = title;
    this.lengthSecconds = lengthSeconds;
    this.addedBy = addedBy;

    // store the stream here
    this.stream = null;
  }

  formatLength() {
    return `${ Math.floor(this.lengthSeconds / 60) }:${ this.lengthSeconds % 60 }`;
  }

  get stream() {
    if (this.stream === null) {
      this.stream = ytdl(this.url, { format: 'audioonly' });
    }

    return this.stream;
  }

  //  export with Song and wrap in promise
  static getInfo() {
    return new Promise((resolve, reject) => {
      ytdl.getInfo(...arguments, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
};
