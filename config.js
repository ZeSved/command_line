const configFile = require('./config.json')
const fileSystem = require('fs')

const config = {
	originPath: (newPath) => {
		configFile['custom-origin-path'] = newPath[1]
		fileSystem.writeFileSync('./config.json', JSON.stringify(configFile, null, 2))
	},
}

module.exports = config
