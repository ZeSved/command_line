const files = require('fs')
const string = require('./util')

const navigation = {
	cd: (options) => {
		const pathSegments = currentDirectory.split('\\')
		const newPathSegments = options[1].split('\\')

		for (const directory in newPathSegments) {
			if (newPathSegments[directory] === '..') {
				pathSegments.pop()
			} else {
				pathSegments.push(newPathSegments[directory])
			}
		}

		globalThis.currentDirectory = `${pathSegments.join('\\')}`
	},

	dir: (options) => {
		const flags = options.filter((part) => part.startsWith('-'))

		if (currentDirectory === 'C:') globalThis.currentDirectory += '\\'

		files.readdir(
			currentDirectory.replaceAll('\\', '\\\\'),
			{ withFileTypes: true },
			(err, paths) => {
				paths.forEach((segment) => {
					if (flags.includes('-info')) {
						console.log(
							`name: ${segment.name}
              | parent_path: ${segment.parentPath}
              | is_symbolic_link: ${segment.isSymbolicLink()}
              | is_socket: ${segment.isSocket()}
              | is_file: ${segment.isFile()}
              | is_FIFO: ${segment.isFIFO()}
              | is_directory: ${segment.isDirectory()}
              | is_character_device: ${segment.isCharacterDevice()}
              | is_block_device: ${segment.isBlockDevice()}\n`
						)
					} else if (
						(segment.isFile() && flags.includes('-file')) ||
						(segment.isSymbolicLink() && flags.includes('-hidden'))
					) {
						console.log(segment.name)
					} else {
						if (!segment.isSymbolicLink && !segment.isFile()) {
							console.log(segment.name)
						}
					}
				})
			}
		)

		globalThis.currentDirectory.replace('\\', '')
	},
}

module.exports = navigation
