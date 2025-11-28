import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Hotel from "../models/hotel.model.js";

// Obtener todos los reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({ include: [User, Hotel] });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reviews" });
  }
};

// Obtener un review por ID
export const getReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [User, Hotel],
    });

    if (!review) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener review" });
  }
};

// Crear review
export const createReview = async (req, res) => {
  try {
    const { comment, rating, user_id, hotel_id } = req.body;

    const review = await Review.create({
      comment,
      rating,
      user_id,
      hotel_id,
    });

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Error al crear review" });
  }
};

// Actualizar review
export const updateReview = async (req, res) => {
  try {
    const { comment, rating, user_id, hotel_id } = req.body;

    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

    await review.update({
      comment,
      rating,
      user_id,
      hotel_id,
    });

    res.json({ message: "Review actualizada", review });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar review" });
  }
};

// Eliminar review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

    await review.destroy();

    res.json({ message: "Review eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar review" });
  }
};
