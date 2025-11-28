import Image from "../models/image.model.js";
import Hotel from "../models/hotel.model.js";

export const getImages = async (req, res) => {
  try {
    const images = await Image.findAll({ include: Hotel });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const { url, hotel_id } = req.body;

    if (!url || !hotel_id) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const image = await Image.create({ url, hotel_id });

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Error al subir imagen" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;

    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    await image.destroy();

    res.json({ message: "Imagen eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar imagen" });
  }
};
