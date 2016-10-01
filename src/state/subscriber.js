const log = require('debug')('chordlr:subscriber')
const actions = require('./actions')

module.exports = (bot, store) => {
  const localState = Object.assign({}, store.getState())
  log(`applying state: \n ${ localState }`)

  const completionPromise = []
  const connectionMap = new Map()

  // map all connections
  for (const [channelId, connection] of localState.voiceConnections) {
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

  // apply local connections
  for (const value of connectionMap.values()) {
    // if bot isn't connected and local is
    if (!value.bot && value.local) {
      value.state.channel.join()
        .then((connection) => {
          store.dispatch(actions.get('update-voice-connection')(connection))
        })
    }
    // if local isn't connected and bot is
    if (!value.local && value.bot) {
      value.bot.disconnect()
    }
  }

  // check dispatchers
  for (const botCon of connectionMap.values()) {
    if (botCon.player.dispatcher !== localState.queue.current.dispatcher) {
      botCon.player._shutdown()
      botCon.player.dispatcher = null

      if (localState.queue.currentDispatcher !== null) {
        const dispatcher = botCon.player.playStream(localState.queue.current.stream)
        store.dispatch(actions.updateCurrentDispatcher(dispatcher))
      }
    }
  }

  return Promise.all(completionPromise)
}
