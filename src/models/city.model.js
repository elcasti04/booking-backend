import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const City = db.define(
	'cities',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{ timestamps: false },
);

export default City;
