import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';
import Hotel from '../models/hotel.model.js';

// Obtener todas las reservas
export const getBookings = async (req, res) => {
	try {
		const bookings = await Booking.findAll({
			include: [User, Hotel],
		});
		res.json(bookings);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener reservas' });
	}
};

// Obtener reserva por ID
export const getBooking = async (req, res) => {
	try {
		const booking = await Booking.findByPk(req.params.id, {
			include: [User, Hotel],
		});

		if (!booking) {
			return res.status(404).json({ error: 'Reserva no encontrada' });
		}

		res.json(booking);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener la reserva' });
	}
};

// Crear reserva
export const createBooking = async (req, res) => {
	try {
		const { date, user_id, hotel_id, nights, room_id } = req.body;

		const booking = await Booking.create({
			date,
			user_id,
			hotel_id,
			nights: nights || 1,
			room_id: room_id || null,
		});

		res.status(201).json(booking);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear reserva' });
	}
};

// Actualizar reserva
export const updateBooking = async (req, res) => {
	try {
		const { date, user_id, hotel_id, nights, room_id } = req.body;

		const booking = await Booking.findByPk(req.params.id);

		if (!booking) {
			return res.status(404).json({ error: 'Reserva no encontrada' });
		}

		await booking.update({ date, user_id, hotel_id, nights, room_id });

		res.json({ message: 'Reserva actualizada', booking });
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar reserva' });
	}
};

// Eliminar reserva
export const deleteBooking = async (req, res) => {
	try {
		const booking = await Booking.findByPk(req.params.id);

		if (!booking) {
			return res.status(404).json({ error: 'Reserva no encontrada' });
		}

		await booking.destroy();

		res.json({ message: 'Reserva eliminada' });
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar reserva' });
	}
};
