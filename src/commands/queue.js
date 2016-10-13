const log = require('debug')('cordlr-music:command:queue')

module.exports = {
  name: 'queue',
  usage: 'queue <startAt>',

  run(message, args) {
    log('queue:', args[1])
    if (!message.guild.voiceConnection) {
      return message.reply('I\'m not in a voice channel')
    }
    const queueArr = formatQueue(message.guild.voiceConnection.musicManager.queue)
    message.reply(queueArr, { split: true })
  }
}

function formatQueue(queue, startAtIndex = 0) {
  const lines = ['Queue:\n']
  let index = startAtIndex
  while (lines.join('\n').length < 2000 && index < queue.length) { // discord has a 2000 char limit
    const song = queue[index]
    lines.push(`${ index }.\t${ song.title }`)
    index++
  }

  if (lines.join('\n').length > 2000) {
    log('removing last item')
    lines.splice(-1, 1) // remove last item
  }

  return lines
}
