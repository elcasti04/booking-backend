import express from 'express';
import {
	getUsers,
	createUser,
	deleteUser,
	getUser,
	updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

// GET /users - obtener todos los usuarios
router.get('/', getUsers);

// POST /users - crear usuario
router.post('/', createUser);

// GET /users/:id - obtener usuario por id (opcional)
router.get('/:id', getUser);

// PUT /users/:id - actualizar usuario (opcional)
router.put('/:id', updateUser);

// DELETE /users/:id - eliminar usuario
router.delete('/:id', deleteUser);

export default router;
