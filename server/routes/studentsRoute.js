/** @format */

import express from "express";

import {
  getStudents,
  getStudentsById,
  saveStudents,
  deleteStudents,
} from "../controllers/studentsController.js";

const router = express.Router();

router.get("/student", getStudents);
router.get("/student/:nomor_induk", getStudentsById);
router.post("/student", saveStudents);
router.delete("/student/:nomor_induk", deleteStudents);

export default router;
