const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Video = sequelize.define('Video', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	sources: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	thumb: {
		type: DataTypes.STRING,
	},
});

module.exports = Video;
