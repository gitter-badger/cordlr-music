module.exports = function UPDATE_DISPATCHER(dispatcher) {
  return {
    type: 'UPDATE_DISPATCHER',
    dispatcher
  }
}

exports.reduce = function reduce(rState, action) {
  const state = Object.assign({}, rState)
  state.dispatcher = action.dispatcher
  return state
}
