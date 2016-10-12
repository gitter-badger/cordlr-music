// add new commands manually here
const join = require('./commands/join')
const add = require('./commands/add')
const start = require('./commands/start')
const queue = require('./commands/queue')

const commands = module.exports = new Map()

commands.set('join', join)
commands.set('add', add)
commands.set('start', start)
commands.set('queue', queue)
