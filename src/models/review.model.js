import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import User from './user.model.js';
import Hotel from './hotel.model.js';

const Review = db.define(
	'reviews',
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		comment: { type: DataTypes.STRING, allowNull: false },
		rating: { type: DataTypes.INTEGER, allowNull: false },
	},
	{ timestamps: false },
);

Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Hotel, { foreignKey: 'hotel_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Hotel.hasMany(Review, { foreignKey: 'hotel_id' });

export default Review;
