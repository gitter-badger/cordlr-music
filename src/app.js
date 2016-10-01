const { createStore } = require('redux')
const log = require('debug')('chordlr:main')
const reducer = require('./state/reducer')
const subscriber = require('./state/subscriber')
const listener = require('./listener')


module.exports = (bot) => {
  // create store
  const store = createStore(reducer)

  // add subscriber
  store.subscribe(subscriber.bind(null, bot, store))

  // release listener
  log('releasing listener')
  return listener.bind(null, bot, store)
}

// TODO move this to separate config file
exports.command = 'music'
exports.usage = 'music <method> [params...]'
