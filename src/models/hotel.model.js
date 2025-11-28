import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import City from './city.model.js';

const Hotel = db.define(
	'hotels',
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		name: { type: DataTypes.STRING, allowNull: false },
		stars: { type: DataTypes.INTEGER, allowNull: false },
		ImageUrl: { type: DataTypes.TEXT, allowNull: false },
		price: { type: DataTypes.INTEGER, allowNull: true },
		city_id: { type: DataTypes.INTEGER, allowNull: true },
	},
	{ timestamps: false },
);

Hotel.belongsTo(City, {
	foreignKey: 'city_id',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE',
});
City.hasMany(Hotel, {
	foreignKey: 'city_id',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE',
});

export default Hotel;
