module.exports = class newSong {
  constructor(song, index = -1) {
    this.type = 'NEW_SONG';
    this.song = song;
    this.index = index;
  }

  static reduce(rState, action) {
    const state = Object.assign({}, rState);
    state.queue.splice(action.index, 0, action.song);
    return state;
  }
};
