import fileSystem from 'fs'

export const folders = {
	cd: (options: string[]) => {
		const pathSegments = globalThis.currentDirectory.split('\\')
		const newPathSegments = options[1].split('\\')

		for (const directory in newPathSegments) {
			if (newPathSegments[directory] === '..') {
				pathSegments.pop()
			} else {
				pathSegments.push(newPathSegments[directory])
			}
		}

		const newPath = pathSegments.join('\\')
		if (fileSystem.existsSync(newPath)) {
			globalThis.currentDirectory = `${pathSegments.join('\\')}`
		} else {
			console.log('Path not found.')
		}
	},

	dir: (options: string[]) => {
		const flags = options.filter((part) => part.startsWith('-'))

		if (globalThis.currentDirectory === 'C:') globalThis.currentDirectory += '\\'

		fileSystem.readdir(globalThis.currentDirectory, { withFileTypes: true }, (err: Error | null, paths: fileSystem.Dirent[]) => {
			paths.forEach((segment) => {
				if (options[1] === undefined) {
					console.log(segment.name)
				}

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
		})

		globalThis.currentDirectory.replaceAll('\\\\', '\\')
	},

	mkdir: (name: string[]) => {
		if (!fileSystem.existsSync(`${globalThis.currentDirectory}${name[1]}`)) {
			fileSystem.mkdir(`${globalThis.currentDirectory}${name[1]}`, () => {
				console.log('Path successfully created.')
			})
		} else {
			console.log('Path/folder already exists.')
		}
	},

	rmdir: (name: string[]) => {
		if (fileSystem.existsSync(`${globalThis.currentDirectory}${name[1]}`)) {
			fileSystem.unlink(`${globalThis.currentDirectory}${name[1]}`, () => {
				console.log('Directory successfully removed')
			})
		} else {
			console.log('Directory not found')
		}
	}
}
