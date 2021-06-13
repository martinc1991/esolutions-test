const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Video = sequelize.define(
	'Video',
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// I'm using SQLite and it doesn't support ARRAY datatype so I splitted 'sources' filed into 'source_1' and 'source_2'
		source_1: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		source_2: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},
		thumb: {
			type: DataTypes.STRING,
		},
	},
	{ timestamps: false }
);

module.exports = Video;
