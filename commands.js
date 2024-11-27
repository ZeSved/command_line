const { originPath } = require('./config')
const { cd, dir } = require('./folders')

const commands = {
	cd,
	dir: dir,
	ls: dir,
	originPath,
}

module.exports = commands
