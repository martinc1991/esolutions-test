const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Category = sequelize.define(
	'Category',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{ timestamps: false }
);

module.exports = Category;
