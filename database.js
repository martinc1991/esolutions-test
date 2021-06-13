const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test-db', 'user', 'pass', {
	dialect: 'sqlite',
	host: './videos.sqlite',
	logging: false, // Disable logging every query
});

module.exports = sequelize;
