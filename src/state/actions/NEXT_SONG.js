module.exports = class nextSong {
  constructor() {
    this.type = 'NEXT_SONG'
  }

  static reduce(rState) {
    const state = Object.assign({}, rState)
    state.history.unshift(state.queue.shift())
    return state
  }
}
