import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import Hotel from './hotel.model.js';

const Image = db.define(
	'images',
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		url: { type: DataTypes.STRING, allowNull: false },
		hotel_id: { type: DataTypes.INTEGER, allowNull: false },
	},
	{ timestamps: false },
);

Image.belongsTo(Hotel, { foreignKey: 'hotel_id' });
Hotel.hasMany(Image, { foreignKey: 'hotel_id' });

export default Image;
