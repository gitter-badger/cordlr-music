const { readdirSync } = require('fs')

const actions = module.exports = {}

const files = readdirSync('./src/state/actions').filter((file) => (/([\w]+)\.js$/).test(file))

for (const filename of files) {
  const action = require(`./actions/${ filename }`)
  const type = (/([\w]+)\.js$/).exec(filename)[1]
  actions[type] = action
}
