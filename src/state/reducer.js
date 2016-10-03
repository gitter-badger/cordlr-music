const StateContainer = require('../structures/StateContainer')
const actions = require('./actions')
const log = require('debug')('chordlr:reducer')

// this is the main reduce router, the actual reducers are combined with the actions in every action file
module.exports = (state = {}, action = { type: null }) => {
  // if the action is invalid, no reducer will touch this and the state won't be changed
  let newState = new StateContainer(state)
  log(`State before action ${ action }: \n${ newState }`)
  if (action.type in actions) {
    log(`matched action type ${ action.type }, reducing`)
    newState = actions[action.type].reduce(state, action)
  }

  log(`State after action ${ action }: \n${ newState }`)
  return newState
}
