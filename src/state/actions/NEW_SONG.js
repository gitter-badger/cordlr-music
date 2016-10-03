module.exports = function NEW_SONG(song, index = -1) {
  return {
    type: 'NEW_SONG',
    song,
    index
  }
}

exports.reduce = function reduce(rState, action) {
  const state = Object.assign({}, rState)
    // convert -1 to length to add to end of queue
  if (action.index === -1) {
    action.index = state.queue.length
  }
  state.queue.splice(action.index, 0, action.song)
  return state
}
