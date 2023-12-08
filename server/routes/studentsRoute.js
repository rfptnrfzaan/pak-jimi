/** @format */

import express from "express";

import {
  getStudents,
  getStudentsById,
  RegisterStudent,
  LoginStudent,
  deleteStudents,
} from "../controllers/Student/studentsController.js";

const router = express.Router();

router.get("/student", getStudents);
router.get("/student/:nomor_induk", getStudentsById);
router.post("/student/register", RegisterStudent);
router.post("/student/login", LoginStudent);
router.delete("/student/:nomor_induk", deleteStudents);

export default router;
