import express from 'express';
import { pool } from '../database/db.js';

const router = express.Router();

// GET /cities
router.get('/', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM cities ORDER BY id ASC');
		res.json(result.rows);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error getting cities', error: error.message });
	}
});

// POST /cities
router.post('/', async (req, res) => {
	try {
		const { name, country } = req.body;
		const result = await pool.query(
			'INSERT INTO cities (name, country) VALUES ($1, $2) RETURNING *',
			[name, country],
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error creating city', error: error.message });
	}
});

export default router;
