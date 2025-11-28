import { Router } from "express";
import {
  getImages,
  uploadImage,
  deleteImage,
} from "../controllers/image.controller.js";

const router = Router();

router.get("/", getImages);
router.post("/", uploadImage);
router.delete("/:id", deleteImage);

export default router;
