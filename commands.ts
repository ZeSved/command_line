import { config } from './config'
import { folders } from './folders'

const { cd, dir, mkdir } = folders
const { originPath } = config
export const commands = {
	cd,
	dir: dir,
	ls: dir,
	originPath,
	mkdir,
	md: mkdir
}

// module.exports = commands
