const { readdirSync } = require('fs')
const { join } = require('path')

const commandDir = 'commands'

const commands = module.exports = new Map()

readdirSync(join(__dirname, commandDir))
  .filter(file => (/\w+\.js/).test(file))
  .map(file => require(join(__dirname, commandDir, file)))
  .forEach(command => commands.set(command.name, command))
