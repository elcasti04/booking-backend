import { pool } from "../database/db.js";

// GET all rooms
export const getRooms = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rooms");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching rooms", details: error.message });
  }
};

// GET room by ID
export const getRoomById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rooms WHERE id = $1", [req.params.id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Room not found" });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching room", details: error.message });
  }
};

// CREATE room
export const createRoom = async (req, res) => {
  try {
    const { number, type, price } = req.body;

    const result = await pool.query(
      `INSERT INTO rooms (number, type, price)
       VALUES ($1, $2, $3) RETURNING *`,
      [number, type, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error creating room", details: error.message });
  }
};

// UPDATE room
export const updateRoom = async (req, res) => {
  try {
    const { number, type, price } = req.body;

    const result = await pool.query(
      `UPDATE rooms SET number=$1, type=$2, price=$3 WHERE id=$4 RETURNING *`,
      [number, type, price, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating room", details: error.message });
  }
};

// DELETE room
export const deleteRoom = async (req, res) => {
  try {
    await pool.query("DELETE FROM rooms WHERE id = $1", [req.params.id]);
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting room", details: error.message });
  }
};
