// src/routes/review.routes.js
import { Router } from "express";
import {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = Router();

router.get("/", getReviews);
router.post("/", createReview);
router.get("/:id", getReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
