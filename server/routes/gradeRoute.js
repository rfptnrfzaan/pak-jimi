/** @format */

import express from "express";

import {
  getGrades,
  getGradesById,
  saveGrades,
  deleteGrades,
} from "../controllers/gradeController.js";

const router = express.Router();

router.get("/grade", getGrades);
router.get("/grade/:id", getGradesById);
router.post("/grade", saveGrades);
router.delete("/grade/:id", deleteGrades);

export default router;
