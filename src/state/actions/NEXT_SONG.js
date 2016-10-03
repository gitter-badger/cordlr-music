module.exports = function NEXT_SONG() {
  return { type: 'NEXT_SONG' }
}

exports.reduce = function reduce(rState) {
  const state = Object.assign({}, rState)
  state.history.unshift(state.queue.shift())
  return state
}
