const testVoice = require('../util/testVoice')

module.exports = {
  name: 'queue',
  usage: 'queue <startAt>',

  run(message) {
    if (!testVoice(message)) return
    const queueArr = formatQueue(message.guild.voiceConnection.musicManager.queue)
    message.reply(queueArr, { split: true })
  }
}

function formatQueue(queue, startAtIndex = 0) {
  const lines = ['Queue:\n']
  let index = startAtIndex
  for (let i = index; i < queue.length; i++) {
    const song = queue[index]
    lines.push(`${ index }.\t${ song.title }`)
    index++
  }

  return lines
}
