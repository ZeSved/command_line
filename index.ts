const readline = require('node:readline')
const navigation = require('./folders')
const config = require('./config.json')
const commands = require('./commands')

globalThis['currentDirectory'] =
	config['custom-origin-path'].length > 0
		? config['custom-origin-path']
		: config['default-origin-path']

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

let active = true
function sys() {
	rl.question(`crayon ${globalThis.currentDirectory}\n|> `, (cmd: string) => {
		const command = cmd.split(' ')
		if (command[0] === 'exit') {
			rl.close()
			active = !active
			return
		} else {
			commands[command[0]]([...command])
			setTimeout(() => {
				sys()
			}, 5)
		}
	})
}

if (active) sys()
