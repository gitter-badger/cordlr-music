const log = require('debug')('chordlr:subscriber')
const actions = require('./actions')

module.exports = (bot, store) => {
  const state = Object.assign({}, store.getState())
  log(`applying state: \n ${ state }`)

  const completionPromise = []
  const connectionMap = new Map()

  // map all connections
  for (const [channelId, connection] of state.voiceConnections) {
    const set = {
      state: connection,
      bot: bot.voiceConnections.get(channelId)
    }
    connectionMap.set(channelId, set)
  }
  for (const [channelId, connection] of bot.voiceConnections) {
    if (!connectionMap.has(channelId)) {
      const set = { bot: connection }
      connectionMap.set(channelId, set)
    };
  }

  // apply state connections
  for (const value of connectionMap.values()) {
    // if bot isn't connected and state is
    if (!value.bot && value.state) {
      completionPromise.push(
        value.state.channel.join()
          .then((connection) => {
            store.dispatch(actions.UPDATE_VOICE_CONNECTION(connection))
          })
      )
    }
    // if state isn't connected and bot is
    if (!value.state && value.bot) {
      completionPromise.push(
        Promise.resolve(value.bot.disconnect())
      )
    }
  }

  // check dispatchers
  for (const set of connectionMap.values()) {
    // check equality
    if (set.state.player.dispatcher !== set.bot.player.dispatcher) {
      // TODO add proper handeling for when they don't match
      log('dispatcher in state didn\'t match dispatcher in bot')
      completionPromise.push(Promise.reject(new Error('dispatcher in state didn\'t match dispatcher in bot')))
    }
  }

  // return all promises together and let people handle errors themselves aswell
  return Promise.all(completionPromise).catch((error) => {
    log(`Error in one of the promises: ${ error }`)
    return Promise.reject(error)
  })
}
