import { Router } from "express";
import {
  getHotels,
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel
} from "../controllers/hotel.controller.js";

const router = Router();

router.get("/", getHotels);
router.post("/", createHotel);
router.get("/:id", getHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
