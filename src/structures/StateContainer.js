module.exports = class StateContainer {
  constructor(state = {}) {
    Object.assign(this, state)

    this.queue = []
    this.history = []

    this.voiceConnections = new Map()
    this.dispatcher = null
  }
}
