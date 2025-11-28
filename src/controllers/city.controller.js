import City from '../models/city.model.js';

export const getCities = async (req, res) => {
	try {
		const cities = await City.findAll();
		res.json(cities);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener ciudades' });
	}
};

export const createCity = async (req, res) => {
	try {
		const { name, country } = req.body;
		const city = await City.create({ name, country });
		res.json(city);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear ciudad' });
	}
};

export const getCity = async (req, res) => {
	try {
		const city = await City.findByPk(req.params.id);
		if (!city) return res.status(404).json({ error: 'Ciudad no encontrada' });
		res.json(city);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener ciudad' });
	}
};

export const updateCity = async (req, res) => {
	try {
		const { name, country } = req.body;
		await City.update({ name, country }, { where: { id: req.params.id } });
		res.json({ message: 'Ciudad actualizada' });
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar ciudad' });
	}
};

export const deleteCity = async (req, res) => {
	try {
		const deleted = await City.destroy({
			where: { id: req.params.id },
		});

		if (!deleted) {
			return res.status(404).json({ error: 'Ciudad no encontrada' });
		}

		res.json({ message: 'Ciudad eliminada' });
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar ciudad' });
	}
};
