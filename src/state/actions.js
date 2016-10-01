const { readdirSync } = require('fs')

const actions = module.exports = {}

const files = readdirSync('./src/state/actions').filter((file) => file.match(/[\w-]+\.js$/))

for (const filename of files) {
  const action = require(`./actions/${ filename }`)
  actions[action.type] = action
}
