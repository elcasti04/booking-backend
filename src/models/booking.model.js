import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import User from './user.model.js';
import Hotel from './hotel.model.js';

const Booking = db.define(
	'bookings',
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		date: { type: DataTypes.DATE, allowNull: false },
		nights: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
		room_id: { type: DataTypes.INTEGER, allowNull: true },
	},
	{ timestamps: false },
);

Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Hotel, { foreignKey: 'hotel_id' });

User.hasMany(Booking, { foreignKey: 'user_id' });
Hotel.hasMany(Booking, { foreignKey: 'hotel_id' });

export default Booking;
