import express from "express";
import {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

// Rutas CRUD para reservas
router.get("/", getBookings);
router.get("/:id", getBooking);       // Obtener reserva por ID
router.post("/", createBooking);      // Crear nueva reserva
router.put("/:id", updateBooking);    // Actualizar reserva
router.delete("/:id", deleteBooking); // Eliminar reserva

export default router;
