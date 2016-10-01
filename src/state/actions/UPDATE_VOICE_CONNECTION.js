module.exports = class updateVoiceConnection {
  constructor(channelId, voiceConnection) {
    this.type = 'UPDATE_VOICE_CONNECTION';
    this.channelId = channelId;
    this.voiceConnection = voiceConnection;
  }

  static reduce(rState, action) {
    const state = Object.assign({}, rState);
    state.voiceConnections.set(action.channelId, action.voiceConnection);
    return state;
  }
};
