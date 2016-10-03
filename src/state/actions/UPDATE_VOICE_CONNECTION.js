module.exports = function UPDATE_VOICE_CONNECTION(connection) {
  return {
    type: 'UPDATE_VOICE_CONNECTION',
    connection
  }
}

exports.reduce = function reduce(rState, action) {
  const state = Object.assign({}, rState)
  state.voiceConnections.set(action.channelId, action.connection)
  return state
}
