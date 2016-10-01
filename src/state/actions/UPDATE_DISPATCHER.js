module.exports = class updateDispatcher {
  constructor(dispatcher) {
    this.type = 'UPDATE_DISPATCHER';
    this.dispatcher = dispatcher;
  }

  static reduce(rState, action) {
    const state = Object.assign({}, rState);
    state.dispatcher = action.dispatcher;
    return state;
  }
};
