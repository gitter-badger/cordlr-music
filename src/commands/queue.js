const log = require('debug')('cordlr-music:command:queue')

module.exports = {
  name: 'queue',
  usage: 'queue <startAt>',

  run(message, args) {
    args[1] = Number(args[1])
    if (isNaN(args[1])) {
      args[1] = 0
    }
    log('queue:', args[1])
    let manager
    try {
      manager = message.guild.voiceConnection.musicManager
    } catch (e) {
      message.reply('Im not in a voice channel')
    }
    const queueString = formatQueue(manager.queue, args[1])
    message.reply(queueString)
  }
}

function formatQueue(queue, startAtIndex = 0) {
  const lines = ['Queue:\n']
  let index = startAtIndex
  while (lines.join('\n').length < 2000 && index < queue.length) { // discord has a 2000 char limit
    const song = queue[index]
    lines.push(`${ index + 1 }.\t${ song.title }`)
    index++
  }

  if (lines.join('\n').length > 2000) {
    log('removing last item')
    lines.splice(-1, 1) // remove last item
  }

  return lines.join('\n')
}
