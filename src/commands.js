// TODO make this automatic
const join = require('./commands/join')
const rawCommands = [join]

// class to cast commands into
class Command {
  constructor(command) {
    this.name = command.name
    this.run = command.run
  }
}

const commands = module.exports = new Map()

for (let command of rawCommands) {
  command = new Command(command)
  commands.set(command.name, command)
}
