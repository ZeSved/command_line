// const configFile = require('./config.json')
// const fileSystem = require('fs')
import configFile from './config.json'
import fileSystem from 'fs'

export const config = {
	originPath: (newPath: string[]) => {
		configFile['custom-origin-path'] = newPath[1]
		fileSystem.writeFileSync('./config.json', JSON.stringify(configFile, null, 2))
	},
}

// module.exports = config
