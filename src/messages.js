// this is what the bot says
module.exports = {
  nowPlaying: songTitle => `I'm now bustin \`${ songTitle }\``,
  notInVoiceChannel: () => 'Ay, I\'m not in a voice channel man',
  resumed: () => 'I resumed that for ya',
  addedSong: songTitle => `Gotcha! I added \`${ songTitle }\``,
  errorAddedSong: () => 'Something went wrong and I couldn\'t add your song :(',
  noSuchCommand: () => 'I aint got that command (yet...)',
  changeVolume: () => 'Too loud? too quiet? whatevs 😴',
  noArg: () => 'At least give me a hint to what you want',
  stopped: () => 'Went and shut it down'
}
