import Hotel from '../models/hotel.model.js';
import City from '../models/city.model.js';

// Obtener todos los hoteles
export const getHotels = async (req, res) => {
	try {
		const hotels = await Hotel.findAll();
		// asignar precio aleatorio en COP entre 400000 y 800000 si no tiene precio
		for (const h of hotels) {
			if (h.price == null) {
				const price =
					Math.floor(Math.random() * (800000 - 400000 + 1)) + 400000;
				await h.update({ price });
				h.price = price;
			}
		}
		res.json(hotels);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Crear un hotel
export const createHotel = async (req, res) => {
	try {
		const { name, stars, ImageUrl, city_id, price } = req.body;
		const priceToUse =
			price || Math.floor(Math.random() * (800000 - 400000 + 1)) + 400000;
		// Si no viene city_id, dejar null (no forzar id = 1)
		const cityIdToUse =
			typeof city_id !== 'undefined' && city_id !== null ? city_id : null;

		// Si se proporcionó city_id, verificar que exista la ciudad
		if (cityIdToUse !== null) {
			const cityExists = await City.findByPk(cityIdToUse);
			if (!cityExists) {
				return res.status(400).json({ error: 'La ciudad indicada no existe' });
			}
		}
		const hotel = await Hotel.create({
			name,
			stars,
			ImageUrl,
			city_id: cityIdToUse,
			price: priceToUse,
		});
		res.status(201).json(hotel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Obtener un hotel por ID
export const getHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findByPk(req.params.id);
		if (!hotel) return res.status(404).json({ message: 'Hotel no encontrado' });
		if (hotel.price == null) {
			const price = Math.floor(Math.random() * (800000 - 400000 + 1)) + 400000;
			await hotel.update({ price });
			hotel.price = price;
		}
		res.json(hotel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Actualizar un hotel
export const updateHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findByPk(req.params.id);
		if (!hotel) return res.status(404).json({ message: 'Hotel no encontrado' });
		// Si se intenta actualizar city_id, verificar que exista la ciudad
		if (Object.prototype.hasOwnProperty.call(req.body, 'city_id')) {
			const newCityId = req.body.city_id;
			if (newCityId !== null && typeof newCityId !== 'undefined') {
				const cityExists = await City.findByPk(newCityId);
				if (!cityExists) {
					return res
						.status(400)
						.json({ error: 'La ciudad indicada no existe' });
				}
			}
		}

		await hotel.update(req.body);
		res.json(hotel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Eliminar un hotel
export const deleteHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findByPk(req.params.id);
		if (!hotel) return res.status(404).json({ message: 'Hotel no encontrado' });
		await hotel.destroy();
		res.json({ message: 'Hotel eliminado' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
