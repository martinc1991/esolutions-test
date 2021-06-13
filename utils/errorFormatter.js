const errorFormatter = function (error, detail = '') {
	console.log('\x1b[31m%s\x1b[0m', 'ERROR');
	console.log('MESSAGE:', error.message);
	console.log('STACK:', error.stack);
	return {
		error: true,
		message: error.message,
		detail: detail,
		stack: error.stack,
	};
};

module.exports = errorFormatter;
