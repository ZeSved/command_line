// const readline = require('node:readline')
// const navigation = require('./folders')
// const configData = require('./config.json')
// const commands = require('./commands')
import readline from 'node:readline'
import configData from './config.json'
import { commands } from './commands'

globalThis['currentDirectory'] =
	configData['custom-origin-path'].length > 0
		? configData['custom-origin-path']
		: configData['default-origin-path']

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

let active = true
function sys() {
	rl.question(`crayon ${globalThis.currentDirectory}\n|> `, (command: string) => {
		const cmd = command.split(' ')
		if (cmd[0] === 'exit') {
			rl.close()
			active = !active
			return
		} else {
			commands[cmd[0] as keyof typeof commands]([...cmd])

			setTimeout(() => {
				sys()
			}, 5)
		}
	})
}

if (active) sys()
