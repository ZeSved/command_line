import { config } from './config'
import { folders } from './folders'

const { cd, dir } = folders
const { originPath } = config
export const commands = {
	cd,
	dir: dir,
	ls: dir,
	originPath,
}

// module.exports = commands
