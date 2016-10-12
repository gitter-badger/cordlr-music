// add new commands manually here
const join = require('./commands/join')
const add = require('./commands/add')

const commands = module.exports = new Map()

commands.set('join', join)
commands.set('add', add)
