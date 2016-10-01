const StateContainer = require('../structures/StateContainer')
const actions = require('./actions')

// this is the main reduce router, the actual reducers are combined with the actions in every action file
module.exports = (state, action) => {
  // if the action is invalid, no reducer will touch this and
  let newState = new StateContainer(state)
  if (action.type in actions) {
    newState = actions[action.type].reduce(state, action)
  }

  return newState
}
