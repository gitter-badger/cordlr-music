module.exports = {
  name: 'start',
  usage: 'start',

  run(message) {
    const connection = message.guild.voiceConnection
    if (!connection) {
      message.reply('I\'m not connected to a voice channel')
    }
    connection.musicManager.start()
  }
}
