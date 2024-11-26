function string(str) {
	if (str.endsWith('\\') || str.endsWith('/')) str.split('').pop().join('')

	if (str.startsWith('/')) str.split('').shift().unshift('\\').join('')

	if (!(str.startsWith('\\') && str.startsWith('/'))) str.split('').unshift('\\').join('')

	return str
}

module.exports = string
