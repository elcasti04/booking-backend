import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
	try {
		const users = await User.findAll({ attributes: { exclude: ['password'] } });
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener usuarios' });
	}
};

// Crear usuario
export const createUser = async (req, res) => {
	try {
		const { name, username, email, password } = req.body;
		const finalName = name || username || '';

		let hashed = null;
		if (password) {
			hashed = await bcrypt.hash(password, 10);
		}

		const user = await User.create({
			name: finalName,
			email,
			password: hashed,
		});
		const userSafe = user.toJSON();
		delete userSafe.password;
		res.status(201).json(userSafe);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Error al crear usuario', details: error.message });
	}
};

// Obtener un usuario por id
export const getUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener usuario' });
	}
};

// Actualizar usuario
export const updateUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		await user.update(req.body);
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar usuario' });
	}
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		await user.destroy();
		res.json({ message: 'Usuario eliminado correctamente' });
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar usuario' });
	}
};
