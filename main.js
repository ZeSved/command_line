const readline = require('node:readline')
const navigation = require('./navigation')

globalThis.currentDirectory = 'C:'
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

let active = true
function sys() {
	rl.question(`crayon ${currentDirectory}\n|> `, (cmd) => {
		const command = cmd.split(' ')
		if (command[0] === 'exit') {
			rl.close()
			active = !active
			return
		} else {
			navigation[command[0]]([...command])
			setTimeout(() => {
				sys()
			}, 5)
		}
	})
}

if (active) sys()
